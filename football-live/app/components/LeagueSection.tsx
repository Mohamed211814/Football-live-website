import { League } from "../types";
import MatchRow from "./MatchRow";
import LeagueHeader from "./LeagueHeader";

function LeagueIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    "دوري أبطال أوروبا": "🏆",
    "الدوري الإنجليزي الممتاز": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "الدوري الإسباني": "🇪🇸",
    "الدوري الإيطالي": "🇮🇹",
    "الدوري السعودي": "🇸🇦",
    "الدوري المصري الممتاز": "🇪🇬",
    "الدوري المغربي البطولة الإحترافية": "🇲🇦",
    "الدوري الإيطالي الدرجة الأولى": "🇮🇹",
  };
  return <span className="text-lg">{icons[name] || "⚽"}</span>;
}

export default function LeagueSection({ league }: { league: League }) {
  const liveCount = league.matches.filter((m) => m.status === "live").length;

  return (
    <div className="fade-in-up hover-scale bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm mb-4">
      <LeagueHeader
        title={league.name}
        icon={<LeagueIcon name={league.name} />}
        leftContent={
          <span className="text-xs text-gray-400">
            {league.matches.length} مباريات
          </span>
        }
      >
        {liveCount > 0 && (
          <span className="text-[10px] bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">
            {liveCount} مباشر
          </span>
        )}
      </LeagueHeader>

      {/* Matches */}
      <div className="flex flex-col">
        {league.matches.map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
