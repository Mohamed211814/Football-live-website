export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  timestamp?: number;
  status: "live" | "upcoming" | "finished";
  league: string;
  leagueEn?: string;
  channel: string;
  homeLogo?: string;
  awayLogo?: string;
}

export interface League {
  id: number;
  name: string;
  nameEn?: string;
  logo?: string;
  matches: Match[];
}

// API-Football specific types
export interface APIFixtureResponse {
  fixture: {
    id: number;
    timezone: string;
    date: string;
    timestamp: number;
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
    extratime: { home: number | null; away: number | null };
    penalty: { home: number | null; away: number | null };
  };
  events?: APIEvent[];
  lineups?: APILineup[];
  statistics?: APIStatistics[];
}

export interface APIEvent {
  time: {
    elapsed: number;
    extra: number | null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number | null;
    name: string | null;
  };
  assist: {
    id: number | null;
    name: string | null;
  };
  type: string;
  detail: string;
  comments: string | null;
}

export interface APILineup {
  team: {
    id: number;
    name: string;
    logo: string;
    colors?: any;
  };
  coach: {
    id: number;
    name: string;
    photo: string;
  };
  formation: string;
  startXI: {
    player: {
      id: number;
      name: string;
      number: number;
      pos: string;
      grid: string | null;
    };
  }[];
  substitutes: {
    player: {
      id: number;
      name: string;
      number: number;
      pos: string;
      grid: string | null;
    };
  }[];
}

export interface APIStatistics {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: {
    type: string;
    value: string | number | null;
  }[];
}

export interface MatchDetailsData {
  match: Match;
  events: APIEvent[];
  lineups: APILineup[];
  statistics: APIStatistics[];
}
