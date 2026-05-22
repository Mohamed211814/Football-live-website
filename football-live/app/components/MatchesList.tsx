import { League } from "../types";
import LeagueSection from "./LeagueSection";

interface MatchesListProps {
  leagues: League[];
}

export default function MatchesList({ leagues }: MatchesListProps) {
  if (leagues.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="text-gray-300 mb-3">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-500 font-bold text-lg">لا توجد مباريات متاحة اليوم</p>
        <p className="text-gray-400 text-sm mt-1">يرجى التحقق من الأيام الأخرى</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-5">
      {leagues.map((league) => (
        <LeagueSection key={league.id} league={league} />
      ))}
    </div>
  );
}
