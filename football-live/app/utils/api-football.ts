import { APIFixtureResponse, League, Match } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;
const API_URL = process.env.API_FOOTBALL_URL || 'https://v3.football.api-sports.io';

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
        homeScore: fixture.goals.home !== null ? fixture.goals.home : undefined,
        awayScore: fixture.goals.away !== null ? fixture.goals.away : undefined,
        time: matchStatus === 'live' ? String(fixture.fixture.status.elapsed) + "'" : matchTime,
        status: matchStatus,
        league: fixture.league.name,
        channel: 'TBD', // API doesn't provide channel in basic fixture endpoint
      };

      if (!leaguesMap.has(fixture.league.id)) {
        leaguesMap.set(fixture.league.id, {
          id: fixture.league.id,
          name: fixture.league.name,
          logo: fixture.league.logo,
          matches: [],
        });
      }

      leaguesMap.get(fixture.league.id)!.matches.push(match);
    });

    // Convert map to array
    const leaguesArray = Array.from(leaguesMap.values());

    // Sort matches within each league (Live > Upcoming > Finished)
    leaguesArray.forEach((league) => {
      league.matches.sort((a, b) => {
        const statusOrder = { live: 0, upcoming: 1, finished: 2 };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        // If same status, sort by time (assuming time is roughly comparable string)
        return a.time.localeCompare(b.time);
      });
    });

    // Optionally sort leagues (e.g. by total matches or priority)
    leaguesArray.sort((a, b) => b.matches.length - a.matches.length);

    // Limit to only top 5 leagues
    return leaguesArray.slice(0, 5);
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    throw error;
  }
}
