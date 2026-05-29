'use client';

import { League } from "../types";
import MatchRow from "./MatchRow";
import CompetitionHeader from "./CompetitionHeader";
import { useLanguage } from "../context/LanguageContext";
import { getCompetitionName } from "../utils/competition-mapper";

import React from 'react';

const CompetitionSection = React.memo(function CompetitionSection({ league }: { league: League }) {
  const liveCount = league.matches.filter((m) => m.status === "live").length;
  const { locale } = useLanguage();
  
  const displayLeague = getCompetitionName(league.id, league.name, locale);

  return (
    <div className="fade-in-up bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm">
      <CompetitionHeader
        title={displayLeague}
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
});

export default CompetitionSection;
