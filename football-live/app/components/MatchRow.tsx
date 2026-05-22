'use client';

import React, { useState } from 'react';
import { Match } from '../types';

interface MatchRowProps {
  match: Match;
}

function TeamLogo({ name, logoUrl }: { name: string; logoUrl?: string }) {
  const [imgError, setImgError] = useState(false);

  // Generate a consistent color from team name for fallback
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

  if (logoUrl && !imgError) {
    return (
      <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center flex-shrink-0">
        <img 
          src={logoUrl} 
          alt={name} 
          onError={() => setImgError(true)}
          className="w-full h-full object-contain drop-shadow-sm"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br ${colors[index]} flex items-center justify-center shadow-sm flex-shrink-0`}>
      <span className="text-white font-bold text-xs md:text-sm">{name.charAt(0)}</span>
    </div>
  );
}

export default function MatchRow({ match }: MatchRowProps) {
  const isLive = match.status === 'live';
  
  // Status text and color logic based on requirements
  let statusText = 'لم تبدأ بعد';
  let statusColor = 'text-gray-500'; // "لم تبدأ بعد" in gray

  if (match.status === 'live') {
    statusText = 'مباشر';
    statusColor = 'text-red-600 font-bold animate-pulse'; // "مباشر" in red
  } else if (match.status === 'finished') {
    statusText = 'انتهت';
    statusColor = 'text-gray-500';
  } else if (match.time === '21:00') { // Mock logic for 'بعد قليل'
    statusText = 'بعد قليل';
    statusColor = 'text-green-600 font-semibold'; // "بعد قليل" in green
  }

  return (
    <div 
      className={`group flex items-center justify-between px-2 sm:px-3 md:px-5 py-2.5 sm:py-3 md:py-3.5 border-b border-gray-200 last:border-b-0 transition-colors duration-200 ${
        isLive ? 'bg-red-50/50 hover:bg-red-50/80' : 'bg-[#f8f9fa] hover:bg-gray-100'
      }`}
      dir="rtl"
    >
      {/* Home Team (Right side in RTL) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 flex-1 min-w-0">
        <TeamLogo name={match.homeTeam} logoUrl={match.homeLogo} />
        <span className="text-xs sm:text-[13px] md:text-[15px] font-bold text-gray-800 truncate">
          {match.homeTeam}
        </span>
      </div>

      {/* Center: Time and Status / Score */}
      <div className="flex flex-col items-center justify-center px-1 sm:px-2 md:px-4 flex-shrink-0 min-w-[60px] sm:min-w-[70px] md:min-w-[90px]">
        {match.status === 'upcoming' ? (
          <>
            {/* Match time in gray */}
            <span className="text-xs sm:text-sm md:text-base font-bold text-gray-500 tabular-nums">{match.time}</span>
            <span className={`text-[9px] sm:text-[10px] md:text-xs mt-0.5 whitespace-nowrap ${statusColor}`}>{statusText}</span>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
              <span className={`text-sm sm:text-base md:text-lg font-bold tabular-nums ${isLive ? 'text-red-600' : 'text-gray-800'}`}>
                {match.homeScore}
              </span>
              <span className="text-gray-400 font-medium text-sm">-</span>
              <span className={`text-sm sm:text-base md:text-lg font-bold tabular-nums ${isLive ? 'text-red-600' : 'text-gray-800'}`}>
                {match.awayScore}
              </span>
            </div>
            <span className={`text-[9px] sm:text-[10px] md:text-xs mt-0.5 whitespace-nowrap ${statusColor}`}>
              {statusText}
            </span>
          </>
        )}
      </div>

      {/* Away Team (Left side in RTL) */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 md:gap-3 flex-1 min-w-0">
        <span className="text-xs sm:text-[13px] md:text-[15px] font-bold text-gray-800 truncate text-left">
          {match.awayTeam}
        </span>
        <TeamLogo name={match.awayTeam} logoUrl={match.awayLogo} />
      </div>
    </div>
  );
}
