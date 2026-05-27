'use client';

import { Match } from "../../../types";
import { useLanguage } from "../../../context/LanguageContext";
import { getArabicTeamName } from "../../../utils/team-mapper";
import Image from "next/image";

export default function MatchHeader({ match }: { match: Match }) {
  const isLive = match.status === "live";
  const { t, locale, isRTL } = useLanguage();

  const displayLeague = locale === 'ar' ? match.league : (match.leagueEn || match.league);
  const displayHomeTeam = locale === 'ar' ? getArabicTeamName(match.homeTeam) : match.homeTeam;
  const displayAwayTeam = locale === 'ar' ? getArabicTeamName(match.awayTeam) : match.awayTeam;

  return (
    <div className="relative overflow-hidden rounded-2xl text-white p-6 md:p-8 mt-4 shadow-xl border border-red-900/20 bg-gradient-to-br from-[#8B1E1E] via-[#aa2222] to-[#4a0d0d]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/20 blur-3xl rounded-full pointer-events-none"></div>

      {/* Top row: League and Status */}
      <div className="relative z-10 flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <span className="text-sm md:text-base font-extrabold tracking-wide drop-shadow-sm opacity-95">{displayLeague}</span>
        <div className="flex flex-col items-center">
            {isLive ? (
              <span className="bg-white text-[#8B1E1E] px-4 py-1.5 rounded-full text-xs md:text-sm font-black shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-pulse">
                {t.match.live}
              </span>
            ) : (
              <span className="bg-black/40 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-inner">
                {match.status === "finished" ? t.match.finished : t.match.upcoming}
              </span>
            )}
        </div>
      </div>

      {/* Main Score Area */}
      <div className="relative z-10 flex justify-between items-center">
        {/* Home Team (Right side in RTL, Left side in LTR) */}
        <div className="flex flex-col items-center w-[30%]">
          <div className="relative w-20 h-20 md:w-28 md:h-28 mb-3 group">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-300"></div>
            {match.homeLogo ? (
              <Image 
                src={match.homeLogo} 
                alt={displayHomeTeam} 
                fill
                className="object-contain drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 80px, 112px"
              />
            ) : (
               <div className="w-full h-full bg-white/10 border border-white/20 rounded-full relative z-10"></div>
            )}
          </div>
          <span className="font-extrabold text-center text-sm md:text-xl drop-shadow-md leading-tight">{displayHomeTeam}</span>
        </div>

        {/* Score / Time Area */}
        <div className="flex flex-col items-center justify-center w-[40%]">
          {match.status === "upcoming" ? (
            <div className="bg-black/30 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl shadow-xl">
              <span className="text-3xl md:text-5xl font-black drop-shadow-lg tabular-nums tracking-wider">{match.time}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 md:gap-6">
              <span className="text-4xl md:text-6xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{match.homeScore}</span>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/50"></div>
              <span className="text-4xl md:text-6xl font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{match.awayScore}</span>
            </div>
          )}
          {isLive && (
            <span className="mt-4 text-sm md:text-base font-bold text-red-200 bg-black/20 px-4 py-1 rounded-full border border-red-300/20 backdrop-blur-sm">
              {match.time}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center w-[30%]">
          <div className="relative w-20 h-20 md:w-28 md:h-28 mb-3 group">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all duration-300"></div>
            {match.awayLogo ? (
              <Image 
                src={match.awayLogo} 
                alt={displayAwayTeam} 
                fill
                className="object-contain drop-shadow-2xl relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 80px, 112px"
              />
            ) : (
               <div className="w-full h-full bg-white/10 border border-white/20 rounded-full relative z-10"></div>
            )}
          </div>
          <span className="font-extrabold text-center text-sm md:text-xl drop-shadow-md leading-tight">{displayAwayTeam}</span>
        </div>
      </div>
    </div>
  );
}
