'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Match } from '../types';
import { useLanguage } from "../context/LanguageContext";
import { getArabicTeamName } from '../utils/team-mapper';

interface MatchRowProps {
  match: Match;
}

function TeamLogo({ name, logoUrl }: { name: string; logoUrl?: string }) {
  const [imgError, setImgError] = useState(false);

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
      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center flex-shrink-0">
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
    <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br ${colors[index]} flex items-center justify-center shadow-sm flex-shrink-0`}>
      <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm">{name.charAt(0)}</span>
    </div>
  );
}

export default function MatchRow({ match }: MatchRowProps) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const { t, isRTL, locale } = useLanguage();
  
  // Status text and color
  let statusText = t.match.upcoming;
  let statusColor = 'text-gray-400';

  if (isLive) {
    statusText = t.match.live;
    statusColor = 'text-red-600 font-bold';
  } else if (isFinished) {
    statusText = t.match.finished;
    statusColor = 'text-gray-500';
  }

  // Check if match is starting soon (within 30 min)
  if (match.status === 'upcoming') {
    const now = new Date();
    const [hours, minutes] = match.time.split(':').map(Number);
    const matchDate = new Date();
    matchDate.setHours(hours, minutes, 0, 0);
    const diffMinutes = (matchDate.getTime() - now.getTime()) / (1000 * 60);
    if (diffMinutes > 0 && diffMinutes <= 30) {
      statusText = t.match.startingSoon;
      statusColor = 'text-green-600 font-semibold';
    }
  }

  const displayHomeTeam = locale === 'ar' ? getArabicTeamName(match.homeTeam) : match.homeTeam;
  const displayAwayTeam = locale === 'ar' ? getArabicTeamName(match.awayTeam) : match.awayTeam;

  return (
    <Link 
      href={`/match/${match.id}`}
      className={`group flex items-center justify-between px-2 sm:px-3 md:px-5 py-2.5 sm:py-3 md:py-3.5 border-b border-gray-100 last:border-b-0 transition-colors duration-200 cursor-pointer hover-scale ${
        isLive ? 'bg-red-50/40' : 'bg-[#fafafa] hover:bg-gray-50'
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Home Team (Right side in RTL, Left side in LTR) */}
      <div className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 min-w-0 ${isRTL ? '' : 'flex-row'}`}>
        <TeamLogo name={displayHomeTeam} logoUrl={match.homeLogo} />
        <span className="text-[11px] sm:text-[13px] md:text-[14px] font-bold text-gray-800 truncate leading-snug">
          {displayHomeTeam}
        </span>
      </div>

      {/* Center: Time and Status / Score */}
      <div className="flex flex-col items-center justify-center px-1 sm:px-2 md:px-4 flex-shrink-0 min-w-[56px] sm:min-w-[68px] md:min-w-[88px]">
        {match.status === 'upcoming' ? (
          <>
            <span className="text-[11px] sm:text-sm md:text-base font-bold text-gray-500 tabular-nums">{match.time}</span>
            <span className={`text-[8px] sm:text-[10px] md:text-[11px] mt-0.5 whitespace-nowrap ${statusColor}`}>{statusText}</span>
          </>
        ) : (
          <>
            <div className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 ${isRTL ? '' : 'flex-row'}`}>
              <span className={`text-sm sm:text-base md:text-lg font-bold tabular-nums ${isLive ? 'text-red-600' : 'text-gray-800'}`}>
                {match.homeScore}
              </span>
              <span className="text-gray-300 font-medium text-xs sm:text-sm">-</span>
              <span className={`text-sm sm:text-base md:text-lg font-bold tabular-nums ${isLive ? 'text-red-600' : 'text-gray-800'}`}>
                {match.awayScore}
              </span>
            </div>
            <span className={`text-[8px] sm:text-[10px] md:text-[11px] mt-0.5 whitespace-nowrap ${statusColor}`}>
              {isLive && <span className={`live-dot inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500 align-middle ${isRTL ? 'ml-1' : 'mr-1'}`} />}
              {isLive ? match.time : statusText}
            </span>
          </>
        )}
      </div>

      {/* Away Team (Left side in RTL, Right side in LTR) */}
      <div className={`flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 min-w-0 ${isRTL ? 'justify-end' : 'justify-end'}`}>
        <span className={`text-[11px] sm:text-[13px] md:text-[14px] font-bold text-gray-800 truncate leading-snug ${isRTL ? 'text-left' : 'text-right'}`}>
          {displayAwayTeam}
        </span>
        <TeamLogo name={displayAwayTeam} logoUrl={match.awayLogo} />
      </div>
    </Link>
  );
}
