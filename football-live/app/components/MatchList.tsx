'use client';

import { League } from "../types";
import CompetitionSection from "./CompetitionSection";
import { useLanguage } from "../context/LanguageContext";

interface MatchListProps {
  leagues: League[];
}

export default function MatchList({ leagues }: MatchListProps) {
  const { t } = useLanguage();

  if (leagues.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="text-gray-300 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-500 font-bold text-lg">{t.home.noMatches}</p>
        <p className="text-gray-400 text-sm mt-1">{t.home.noMatchesDesc}</p>
        <p className="text-gray-300 text-xs mt-3">{t.home.checkOtherDays}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {leagues.map((league) => (
        <CompetitionSection key={league.id} league={league} />
      ))}
    </div>
  );
}
