import React from 'react';
import { Match } from '../types';

interface MatchRowProps {
  match: Match;
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
  const index = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;

  return (
    <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br ${colors[index]} flex items-center justify-center shadow-sm flex-shrink-0`}>
      <span className="text-white font-bold text-xs md:text-sm">{name.charAt(0)}</span>
    </div>
  );
}

export default function MatchRow({ match }: MatchRowProps) {
  const isLive = match.status === 'live';
  
  // Status text logic based on requirements
  let statusText = 'لم تبدأ بعد';
  if (match.status === 'live') {
    statusText = 'مباشر';
  } else if (match.status === 'finished') {
    statusText = 'انتهت';
  } else if (match.time === '21:00') { // Mock logic for 'بعد قليل'
    statusText = 'بعد قليل';
  }

  return (
    <div 
      className="group flex items-center justify-between px-3 md:px-5 py-3 md:py-3.5 bg-[#f8f9fa] hover:bg-gray-100 border-b border-gray-200 last:border-b-0 transition-colors duration-200"
      dir="rtl"
    >
      {/* Home Team (Right side in RTL) */}
      <div className="flex items-center gap-2.5 md:gap-3 flex-1 min-w-0">
        <TeamLogo name={match.homeTeam} />
        <span className="text-[13px] md:text-[15px] font-bold text-gray-800 truncate">
          {match.homeTeam}
        </span>
      </div>

      {/* Center: Time and Status / Score */}
      <div className="flex flex-col items-center justify-center px-2 md:px-4 flex-shrink-0 min-w-[70px] md:min-w-[90px]">
        {match.status === 'upcoming' ? (
          <>
            <span className="text-sm md:text-base font-bold text-gray-800 tabular-nums">{match.time}</span>
            <span className="text-[10px] md:text-xs text-gray-500 mt-0.5">{statusText}</span>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className={`text-base md:text-lg font-bold tabular-nums ${isLive ? 'text-red-600' : 'text-gray-800'}`}>
                {match.homeScore}
              </span>
              <span className="text-gray-400 font-medium">-</span>
              <span className={`text-base md:text-lg font-bold tabular-nums ${isLive ? 'text-red-600' : 'text-gray-800'}`}>
                {match.awayScore}
              </span>
            </div>
            <span className={`text-[10px] md:text-xs mt-0.5 ${isLive ? 'text-red-600 font-bold animate-pulse' : 'text-gray-500'}`}>
              {statusText}
            </span>
          </>
        )}
      </div>

      {/* Away Team (Left side in RTL) */}
      <div className="flex items-center justify-end gap-2.5 md:gap-3 flex-1 min-w-0">
        <span className="text-[13px] md:text-[15px] font-bold text-gray-800 truncate text-left">
          {match.awayTeam}
        </span>
        <TeamLogo name={match.awayTeam} />
      </div>
    </div>
  );
}
