import { APIFixtureResponse, League, Match } from '../types';
import { getArabicCompetitionName } from './competition-mapper';

const API_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
const API_URL = process.env.API_FOOTBALL_URL || 'https://v3.football.api-sports.io';

// Priority order of competitions
const PRIORITY_LEAGUE_IDS = [
  135, // 1. الدوري الإيطالي الدرجة الأولى
  233, // 2. الدوري المصري الممتاز
  200, // 3. الدوري المغربي البطولة الإحترافية
  357, // 4. الدوري الجزائري الدرجة الأولى
  34,  // 5. كأس آسيا للناشئين تحت 17 سنة
  552, // 6. كأس تركيا
  308, // 7. كأس رئيس الدولة الإماراتي
  66,  // 8. كأس فرنسا
  11,  // 9. كوبا سود أمريكانا
  13,  // 10. كوبا ليبرتادوريس
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
  if (!API_KEY) {
    console.error('API_FOOTBALL_KEY is not set');
    throw new Error('API Key missing');
  }

  const dateString = formatDateToYYYYMMDD(date);
  
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

    const fixtures: APIFixtureResponse[] = data.response || [];

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
        channel: 'TBD',
      };

      if (!leaguesMap.has(fixture.league.id)) {
        leaguesMap.set(fixture.league.id, {
          id: fixture.league.id,
          name: getArabicCompetitionName(fixture.league.id, fixture.league.name),
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
