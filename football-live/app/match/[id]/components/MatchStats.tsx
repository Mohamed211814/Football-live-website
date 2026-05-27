'use client';

import { APIStatistics } from "../../../types";
import { useLanguage } from "../../../context/LanguageContext";
import { getArabicTeamName } from "../../../utils/team-mapper";
import { getArabicStatName } from "../../../utils/translation-helper";
import Image from "next/image";

export default function MatchStats({ statistics }: { statistics: APIStatistics[] }) {
  const { t, locale, isRTL } = useLanguage();

  if (!statistics || statistics.length < 2) {
    return <div className="text-center text-gray-500 py-10 font-bold">{t.match.noStats}</div>;
  }

  const homeStats = statistics[0].statistics;
  const awayStats = statistics[1].statistics;

  return (
    <div className="flex flex-col gap-5 py-4 px-2 md:px-8" dir={isRTL ? "rtl" : "ltr"}>
      {/* Team Logos Header for Stats */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image 
              src={statistics[0].team.logo} 
              className="object-contain drop-shadow-md" 
              alt={locale === 'ar' ? getArabicTeamName(statistics[0].team.name) : statistics[0].team.name} 
              fill
              sizes="(max-width: 768px) 48px, 64px"
            />
          </div>
          <span className="font-extrabold text-xs text-gray-500">{locale === 'ar' ? getArabicTeamName(statistics[0].team.name) : statistics[0].team.name}</span>
        </div>
        <div className="text-sm font-black text-gray-300 tracking-widest">{t.common.vs}</div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image 
              src={statistics[1].team.logo} 
              className="object-contain drop-shadow-md" 
              alt={locale === 'ar' ? getArabicTeamName(statistics[1].team.name) : statistics[1].team.name} 
              fill
              sizes="(max-width: 768px) 48px, 64px"
            />
          </div>
          <span className="font-extrabold text-xs text-gray-500">{locale === 'ar' ? getArabicTeamName(statistics[1].team.name) : statistics[1].team.name}</span>
        </div>
      </div>

      {homeStats.map((stat, idx) => {
        const homeValRaw = stat.value !== null ? String(stat.value).replace('%', '') : '0';
        const awayValRaw = awayStats[idx]?.value !== null ? String(awayStats[idx]?.value).replace('%', '') : '0';
        
        const homeVal = Number(homeValRaw) || 0;
        const awayVal = Number(awayValRaw) || 0;
        const total = homeVal + awayVal || 1; 

        const homeWidth = `${(homeVal / total) * 100}%`;
        const awayWidth = `${(awayVal / total) * 100}%`;

        // Highlight the higher number
        const homeWon = homeVal > awayVal;
        const awayWon = awayVal > homeVal;

        return (
          <div key={idx} className="flex flex-col gap-2 group">
            <div className="flex justify-between items-center px-1">
              <span className={`text-sm md:text-base font-black w-10 text-left transition-colors duration-200 ${homeWon ? "text-blue-600" : "text-gray-400"}`}>
                {stat.value !== null ? String(stat.value) : '0'}
              </span>
              
              <span className="text-xs md:text-sm font-extrabold text-gray-500 tracking-wide uppercase group-hover:text-gray-800 transition-colors duration-200">
                {getArabicStatName(stat.type, locale)}
              </span>
              
              <span className={`text-sm md:text-base font-black w-10 text-right transition-colors duration-200 ${awayWon ? "text-red-600" : "text-gray-400"}`}>
                {awayStats[idx]?.value !== null ? String(awayStats[idx]?.value) : '0'}
              </span>
            </div>
            
            {/* The progress bar */}
            <div className="flex w-full h-2.5 bg-gray-100/80 rounded-full overflow-hidden shadow-inner gap-1">
              <div className={`h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700 ease-out ${isRTL ? 'rounded-r-full' : 'rounded-l-full'}`} style={{ width: homeWidth }}></div>
              <div className={`h-full bg-gradient-to-l from-red-400 to-red-600 transition-all duration-700 ease-out ${isRTL ? 'rounded-l-full' : 'rounded-r-full'}`} style={{ width: awayWidth }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
