'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from "../context/LanguageContext";

interface CompetitionHeaderProps {
  title: string;
  logoUrl?: string;
  matchCount: number;
  liveCount: number;
}

const CompetitionHeader = React.memo(function CompetitionHeader({ title, logoUrl, matchCount, liveCount }: CompetitionHeaderProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div 
      className={`flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 bg-white border-b border-gray-200 ${isRTL ? 'border-r-[3px] border-r-[#8B1E1E]' : 'border-l-[3px] border-l-[#8B1E1E]'}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Right side (RTL) / Left side (LTR): logo + title */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        {/* League logo */}
        {logoUrl ? (
          <div className="relative flex items-center justify-center w-6 h-6 md:w-7 md:h-7 shrink-0">
            <Image 
              src={logoUrl} 
              alt={title} 
              fill
              className="object-contain"
              sizes="(max-width: 768px) 24px, 28px"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 shrink-0 bg-gray-100 rounded-full">
            <span className="text-sm">⚽</span>
          </div>
        )}
        
        {/* Competition title */}
        <h2 className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-gray-800 truncate leading-snug">
          {title}
        </h2>
        
        {/* Live badge */}
        {liveCount > 0 && (
          <span className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full border border-red-100 shrink-0">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            {liveCount} {t.match.liveCount}
          </span>
        )}
      </div>
      
      {/* Left side (RTL) / Right side (LTR): match count */}
      <div className={`flex items-center gap-2 text-[11px] md:text-xs text-gray-400 shrink-0 ${isRTL ? 'mr-2' : 'ml-2'}`}>
        <span>{matchCount} {t.common.matches}</span>
      </div>
    </div>
  );
});

export default CompetitionHeader;
