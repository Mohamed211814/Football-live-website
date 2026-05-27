import 'server-only';
import { APIFixtureResponse, League, Match, MatchDetailsData } from '../types';
import { getArabicCompetitionName } from './competition-mapper';
import { withCache } from './cache';

const API_KEY = process.env.API_FOOTBALL_KEY;
const API_URL = process.env.API_FOOTBALL_URL || 'https://v3.football.api-sports.io';

// Cache TTLs (seconds)
const FIXTURES_TTL = 60;      // Refresh fixture list every 60s
const MATCH_DETAIL_TTL = 30;  // Refresh match details every 30s

// Priority order of competitions
const PRIORITY_LEAGUE_IDS = [
  39,   // 1. الدوري الإنجليزي الممتاز
  140,  // 2. الدوري الإسباني الدرجة الأولى
  135,  // 3. الدوري الإيطالي الدرجة الأولى
  78,   // 4. الدوري الألماني الدرجة الأولى
  61,   // 5. الدوري الفرنسي الدرجة الأولى
  233,  // 6. الدوري المصري الممتاز
  200,  // 7. الدوري المغربي البطولة الإحترافية
  357,  // 8. الدوري الأيرلندي الممتاز
  186,  // 9. الدوري الجزائري الدرجة الأولى (correct ID)
  305,  // 10. الدوري القطري (Stars League)
  208,  // 11. الدوري السعودي للمحترفين
  236,  // 12. الدوري التونسي الدرجة الأولى
  219,  // 13. دوري الإمارات للمحترفين
  34,   // 14. كأس آسيا للناشئين تحت 17 سنة
  552,  // 15. كأس تركيا
  308,  // 16. كأس رئيس الدولة الإماراتي
  66,   // 17. كأس فرنسا
  11,   // 18. كوبا سود أمريكانا
  13,   // 19. كوبا ليبرتادوريس
  895,  // 20. كأس الرابطة المصرية
  921,  // 21. بطولة أوروبا تحت 17 سنة
  330,  // 22. الدوري الكويتي الممتاز
  828,  // 23. الدوري التونسي الدرجة الثانية
  417,  // 24. الدوري البحريني تفادي الهبوط
  41,   // 25. الدوري الإنجليزي الدرجة الثالثة (League One)
  253,  // 26. الدوري الأمريكي MLS
  79    // 27. الدوري الألماني تفادي الهبوط (2. Bundesliga)
];



// Helper to map API status to our internal status
function mapMatchStatus(shortStatus: string): Match['status'] {
  const liveStatuses = ['1H', '2H', 'HT', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE'];
  const finishedStatuses = ['FT', 'AET', 'PEN', 'PST', 'CANC', 'ABD', 'AWD', 'WO'];
  
  if (liveStatuses.includes(shortStatus)) return 'live';
  if (finishedStatuses.includes(shortStatus)) return 'finished';
  return 'upcoming';
}

// Helper to format date object to YYYY-MM-DD
function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function fetchFixtures(date: Date = new Date()): Promise<League[]> {
  const dateString = formatDateToYYYYMMDD(date);
  return withCache(`fixtures:${dateString}`, FIXTURES_TTL, () => _fetchFixtures(date, dateString));
}

async function _fetchFixtures(date: Date, dateString: string): Promise<League[]> {
  if (!API_KEY) {
    console.error('API_FOOTBALL_KEY is not set');
    throw new Error('API Key missing');
  }

  // dateString is already passed in from the cache wrapper
  
  try {
    const response = await fetch(`${API_URL}/fixtures?date=${dateString}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error('API-Football Error:', data.errors);
      throw new Error('Failed to fetch data from API-Football');
    }

    let fixtures: APIFixtureResponse[] = data.response || [];
    
    // FILTER: Only keep matches from our priority leagues
    fixtures = fixtures.filter(fixture => PRIORITY_LEAGUE_IDS.includes(fixture.league.id));

    // Transform and group by league
    const leaguesMap = new Map<number, League>();

    fixtures.forEach((fixture) => {
      const matchStatus = mapMatchStatus(fixture.fixture.status.short);
      const matchTimeDate = new Date(fixture.fixture.date);
      const matchTime = `${String(matchTimeDate.getHours()).padStart(2, '0')}:${String(matchTimeDate.getMinutes()).padStart(2, '0')}`;

      const match: Match = {
        id: fixture.fixture.id,
        homeTeam: fixture.teams.home.name,
        awayTeam: fixture.teams.away.name,
        homeLogo: fixture.teams.home.logo,
        awayLogo: fixture.teams.away.logo,
        homeScore: fixture.goals.home !== null ? fixture.goals.home : undefined,
        awayScore: fixture.goals.away !== null ? fixture.goals.away : undefined,
        time: matchStatus === 'live' ? String(fixture.fixture.status.elapsed) + "'" : matchTime,
        status: matchStatus,
        league: getArabicCompetitionName(fixture.league.id, fixture.league.name),
        leagueEn: fixture.league.name,
        channel: 'TBD',
      };

      if (!leaguesMap.has(fixture.league.id)) {
        leaguesMap.set(fixture.league.id, {
          id: fixture.league.id,
          name: getArabicCompetitionName(fixture.league.id, fixture.league.name),
          nameEn: fixture.league.name,
          logo: fixture.league.logo,
          matches: [],
        });
      }

      leaguesMap.get(fixture.league.id)!.matches.push(match);
    });

    // Convert map to array
    const leaguesArray = Array.from(leaguesMap.values());

    // Sort matches within each league: Live > Upcoming > Finished
    leaguesArray.forEach((league) => {
      league.matches.sort((a, b) => {
        const statusOrder = { live: 0, upcoming: 1, finished: 2 };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return a.time.localeCompare(b.time);
      });
    });

    // Sort leagues: Priority leagues first (in defined order), then by live matches, then total matches
    leaguesArray.sort((a, b) => {
      const aPriorityIndex = PRIORITY_LEAGUE_IDS.indexOf(a.id);
      const bPriorityIndex = PRIORITY_LEAGUE_IDS.indexOf(b.id);
      
      const aIsPriority = aPriorityIndex !== -1;
      const bIsPriority = bPriorityIndex !== -1;

      // Both are priority leagues -> sort by priority order
      if (aIsPriority && bIsPriority) {
        return aPriorityIndex - bPriorityIndex;
      }
      
      // Only A is priority -> A comes first
      if (aIsPriority && !bIsPriority) return -1;
      
      // Only B is priority -> B comes first
      if (!aIsPriority && bIsPriority) return 1;

      // Neither is priority -> sort by live matches then total matches
      const aLive = a.matches.filter((m) => m.status === 'live').length;
      const bLive = b.matches.filter((m) => m.status === 'live').length;
      if (aLive !== bLive) return bLive - aLive;
      return b.matches.length - a.matches.length;
    });

    // Only return leagues that have matches
    return leaguesArray.filter((league) => league.matches.length > 0);
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
}

export async function fetchFixtureDetails(id: string | number): Promise<MatchDetailsData> {
  return withCache(`fixture:${id}`, MATCH_DETAIL_TTL, () => _fetchFixtureDetails(id));
}

async function _fetchFixtureDetails(id: string | number): Promise<MatchDetailsData> {
  if (!API_KEY) {
    console.error('API_FOOTBALL_KEY is not set');
    throw new Error('API Key missing');
  }

  try {
    const response = await fetch(`${API_URL}/fixtures?id=${id}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error('API-Football Error:', data.errors);
      throw new Error('Failed to fetch fixture details');
    }

    if (!data.response || data.response.length === 0) {
      throw new Error('Fixture not found');
    }

    const fixtureData: APIFixtureResponse = data.response[0];

    const matchStatus = mapMatchStatus(fixtureData.fixture.status.short);
    const matchTimeDate = new Date(fixtureData.fixture.date);
    const matchTime = `${String(matchTimeDate.getHours()).padStart(2, '0')}:${String(matchTimeDate.getMinutes()).padStart(2, '0')}`;

    const match: Match = {
      id: fixtureData.fixture.id,
      homeTeam: fixtureData.teams.home.name,
      awayTeam: fixtureData.teams.away.name,
      homeLogo: fixtureData.teams.home.logo,
      awayLogo: fixtureData.teams.away.logo,
      homeScore: fixtureData.goals.home !== null ? fixtureData.goals.home : undefined,
      awayScore: fixtureData.goals.away !== null ? fixtureData.goals.away : undefined,
      time: matchStatus === 'live' ? String(fixtureData.fixture.status.elapsed) + "'" : matchTime,
      status: matchStatus,
      league: getArabicCompetitionName(fixtureData.league.id, fixtureData.league.name),
      leagueEn: fixtureData.league.name,
      channel: 'TBD',
    };

    return {
      match,
      events: fixtureData.events || [],
      lineups: fixtureData.lineups || [],
      statistics: fixtureData.statistics || [],
    };
  } catch (error) {
    console.error('Error fetching fixture details:', error);
    throw error;
  }
}
