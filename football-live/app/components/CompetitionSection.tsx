import { League } from "../types";
import MatchRow from "./MatchRow";
import CompetitionHeader from "./CompetitionHeader";

export default function CompetitionSection({ league }: { league: League }) {
  const liveCount = league.matches.filter((m) => m.status === "live").length;

  return (
    <div className="fade-in-up bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm">
      <CompetitionHeader
        title={league.name}
        logoUrl={league.logo}
        matchCount={league.matches.length}
        liveCount={liveCount}
      />

      {/* Matches */}
      <div className="flex flex-col">
        {league.matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
