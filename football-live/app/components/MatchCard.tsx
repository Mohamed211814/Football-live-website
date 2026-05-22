import { Match } from "../types";

function StatusBadge({ status }: { status: Match["status"] }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
        <span className="live-dot w-1.5 h-1.5 rounded-full bg-white inline-block" />
        مباشر
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="inline-flex items-center gap-1 bg-gray-500 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
        انتهت
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
      لم تبدأ
    </span>
  );
}

function TeamLogo({ name }: { name: string }) {
  // Generate a consistent color from team name
  const colors = [
    "from-blue-500 to-blue-700",
    "from-red-500 to-red-700",
    "from-green-500 to-green-700",
    "from-purple-500 to-purple-700",
    "from-yellow-500 to-orange-600",
    "from-cyan-500 to-teal-600",
    "from-pink-500 to-rose-600",
    "from-indigo-500 to-violet-600",
  ];
  const index =
    name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;

  return (
    <div
      className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${colors[index]} flex items-center justify-center shadow-md`}
    >
      <span className="text-white font-bold text-sm md:text-base">
        {name.charAt(0)}
      </span>
    </div>
  );
}

export default function MatchCard({ match }: { match: Match }) {
  const isLive = match.status === "live";

  return (
    <div
      className={`group relative px-4 py-4 transition-all duration-200 hover:bg-gray-50/80 ${
        isLive ? "bg-red-50/40" : ""
      }`}
    >
      {/* Live indicator bar */}
      {isLive && (
        <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-l-full" />
      )}

      {/* Time & Status row */}
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={match.status} />
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
          </svg>
          <span>{match.time}</span>
        </div>
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between">
        {/* Home Team */}
        <div className="flex items-center gap-3 flex-1">
          <TeamLogo name={match.homeTeam} />
          <span className="text-sm md:text-base font-semibold text-gray-800 truncate">
            {match.homeTeam}
          </span>
        </div>

        {/* Score */}
        <div className="flex-shrink-0 mx-3">
          {match.status === "upcoming" ? (
            <span className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1.5 rounded-lg">
              {match.time}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className={`text-xl md:text-2xl font-extrabold tabular-nums ${
                  isLive ? "text-red-600" : "text-gray-800"
                }`}
              >
                {match.homeScore}
              </span>
              <span className="text-gray-300 text-lg font-light">-</span>
              <span
                className={`text-xl md:text-2xl font-extrabold tabular-nums ${
                  isLive ? "text-red-600" : "text-gray-800"
                }`}
              >
                {match.awayScore}
              </span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="text-sm md:text-base font-semibold text-gray-800 truncate text-left">
            {match.awayTeam}
          </span>
          <TeamLogo name={match.awayTeam} />
        </div>
      </div>

      {/* Channel info */}
      <div className="mt-3 flex items-center justify-center">
        <span className="text-[11px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1.5">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {match.channel}
        </span>
      </div>
    </div>
  );
}
