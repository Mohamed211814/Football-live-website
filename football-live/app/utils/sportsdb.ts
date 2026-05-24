import 'server-only';
import { withCache } from './cache';

const SPORTSDB_URL = 'https://www.thesportsdb.com/api/v1/json/123';

// Priority football leagues on TheSportsDB
const PRIORITY_LEAGUES = [
  { id: '4328', name: 'Premier League',       nameAr: 'الدوري الإنجليزي الممتاز', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: '4335', name: 'La Liga',              nameAr: 'الدوري الإسباني',           badge: '🇪🇸' },
  { id: '4332', name: 'Serie A',              nameAr: 'الدوري الإيطالي',           badge: '🇮🇹' },
  { id: '4331', name: 'Bundesliga',           nameAr: 'الدوري الألماني',           badge: '🇩🇪' },
  { id: '4334', name: 'Ligue 1',              nameAr: 'الدوري الفرنسي',            badge: '🇫🇷' },
  { id: '4650', name: 'Egyptian Premier',     nameAr: 'الدوري المصري',             badge: '🇪🇬' },
];

export interface NewsItem {
  id: string;
  headline: string;
  headlineAr: string;
  league: string;
  leagueAr: string;
  leagueBadge: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  date: string;
  thumbnail: string | null;
  leagueId: string;
}

interface SportsDBEvent {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strThumb: string | null;
  strLeague: string;
}

async function _fetchLeagueNews(leagueId: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(
      `${SPORTSDB_URL}/eventspastleague.php?id=${leagueId}`,
      { next: { revalidate: 3600 } }, // Revalidate every hour
    );
    if (!res.ok) return [];
    const data = await res.json();
    const events: SportsDBEvent[] = data.events || [];
    const league = PRIORITY_LEAGUES.find((l) => l.id === leagueId)!;

    return events
      .filter((e) => e.intHomeScore !== null && e.intAwayScore !== null)
      .slice(0, 5) // Take 5 latest results per league
      .map((e) => {
        const homeWin = Number(e.intHomeScore) > Number(e.intAwayScore);
        const awayWin = Number(e.intAwayScore) > Number(e.intHomeScore);
        const draw = Number(e.intHomeScore) === Number(e.intAwayScore);

        const resultEn = homeWin
          ? `${e.strHomeTeam} win`
          : awayWin
          ? `${e.strAwayTeam} win`
          : 'Draw';

        const resultAr = homeWin
          ? `فوز ${e.strHomeTeam}`
          : awayWin
          ? `فوز ${e.strAwayTeam}`
          : 'تعادل';

        const headline = `${e.strHomeTeam} ${e.intHomeScore} - ${e.intAwayScore} ${e.strAwayTeam} | ${resultEn} in ${league.name}`;
        const headlineAr = `${e.strHomeTeam} ${e.intHomeScore} - ${e.intAwayScore} ${e.strAwayTeam} | ${resultAr} في ${league.nameAr}`;

        return {
          id: e.idEvent,
          headline,
          headlineAr,
          league: league.name,
          leagueAr: league.nameAr,
          leagueBadge: league.badge,
          homeTeam: e.strHomeTeam,
          awayTeam: e.strAwayTeam,
          homeScore: e.intHomeScore ?? '-',
          awayScore: e.intAwayScore ?? '-',
          date: e.dateEvent,
          thumbnail: e.strThumb || null,
          leagueId,
        };
      });
  } catch {
    return [];
  }
}

export async function fetchFootballNews(): Promise<NewsItem[]> {
  return withCache('football-news', 3600, async () => {
    // Fetch from all leagues in parallel
    const results = await Promise.all(
      PRIORITY_LEAGUES.map((l) => _fetchLeagueNews(l.id)),
    );

    // Flatten, sort by date descending
    const all = results.flat().sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    return all;
  });
}
