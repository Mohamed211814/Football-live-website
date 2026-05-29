'use client';

import { APILineup } from "../../../types";
import { useLanguage } from "../../../context/LanguageContext";
import { getArabicTeamName, getEnglishTeamName, getTeamLogo } from "../../../utils/team-mapper";
import Image from "next/image";

export default function MatchLineups({ lineups }: { lineups: APILineup[] }) {
  const { t, locale, isRTL } = useLanguage();

  if (!lineups || lineups.length < 2) {
    return <div className="text-center text-gray-500 py-10 font-bold">{t.match.noLineups}</div>;
  }

  const home = lineups[0];
  const away = lineups[1];

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-2 px-2" dir={isRTL ? "rtl" : "ltr"}>
      {/* Home Lineup */}
      <div className="flex-1 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="flex items-center gap-4 mb-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
          <div className="relative w-16 h-16 bg-white rounded-full p-2 shadow-sm flex items-center justify-center shrink-0">
            <Image 
              src={getTeamLogo(home.team.name, home.team.logo) || home.team.logo} 
              className="object-contain p-1" 
              alt={locale === 'ar' ? getArabicTeamName(home.team.name) : getEnglishTeamName(home.team.name)} 
              fill
              sizes="(max-width: 768px) 64px, 64px"
            />
          </div>
          <div>
            <h3 className="font-black text-lg text-gray-800">{locale === 'ar' ? getArabicTeamName(home.team.name) : getEnglishTeamName(home.team.name)}</h3>
            <div className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full" dir="ltr">
              {home.formation}
            </div>
          </div>
        </div>
        
        <h4 className="flex items-center gap-2 text-sm font-extrabold text-gray-400 mb-4 px-2 uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div> {t.match.startingXI}
        </h4>
        <div className="flex flex-col gap-2 mb-8">
          {home.startXI.map((item, idx) => (
            <div key={idx} className="group flex justify-between items-center bg-white hover:bg-blue-50/50 p-3 rounded-xl border border-gray-100 transition-colors duration-200">
              <span className="font-bold text-gray-700 group-hover:text-blue-700 transition-colors">{item.player.name}</span>
              <span className="w-8 h-8 flex items-center justify-center bg-gray-50 group-hover:bg-blue-100 rounded-lg text-sm font-black text-gray-600 group-hover:text-blue-700 transition-colors shadow-sm">{item.player.number}</span>
            </div>
          ))}
        </div>

        <h4 className="flex items-center gap-2 text-sm font-extrabold text-gray-400 mb-4 px-2 uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div> {t.match.substitutes}
        </h4>
        <div className="flex flex-col gap-2">
          {home.substitutes.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 text-sm">
              <span className="font-bold text-gray-600">{item.player.name}</span>
              <span className="w-6 h-6 flex items-center justify-center bg-white rounded text-xs font-bold text-gray-400 shadow-sm">{item.player.number}</span>
            </div>
          ))}
        </div>
        
        {home.coach && (
          <div className="mt-8 pt-5 border-t border-gray-100 flex items-center gap-4 bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-black text-gray-400 uppercase">{t.match.coach}</h4>
            <span className="font-bold text-gray-800">{home.coach.name}</span>
          </div>
        )}
      </div>

      {/* Away Lineup */}
      <div className="flex-1 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
        <div className="flex items-center gap-4 mb-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
          <div className="relative w-16 h-16 bg-white rounded-full p-2 shadow-sm flex items-center justify-center shrink-0">
            <Image 
              src={getTeamLogo(away.team.name, away.team.logo) || away.team.logo} 
              className="object-contain p-1" 
              alt={locale === 'ar' ? getArabicTeamName(away.team.name) : getEnglishTeamName(away.team.name)} 
              fill
              sizes="(max-width: 768px) 64px, 64px"
            />
          </div>
          <div>
            <h3 className="font-black text-lg text-gray-800">{locale === 'ar' ? getArabicTeamName(away.team.name) : getEnglishTeamName(away.team.name)}</h3>
            <div className="inline-block mt-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full" dir="ltr">
              {away.formation}
            </div>
          </div>
        </div>
        
        <h4 className="flex items-center gap-2 text-sm font-extrabold text-gray-400 mb-4 px-2 uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-red-500"></div> {t.match.startingXI}
        </h4>
        <div className="flex flex-col gap-2 mb-8">
          {away.startXI.map((item, idx) => (
            <div key={idx} className="group flex justify-between items-center bg-white hover:bg-red-50/50 p-3 rounded-xl border border-gray-100 transition-colors duration-200">
              <span className="font-bold text-gray-700 group-hover:text-red-700 transition-colors">{item.player.name}</span>
              <span className="w-8 h-8 flex items-center justify-center bg-gray-50 group-hover:bg-red-100 rounded-lg text-sm font-black text-gray-600 group-hover:text-red-700 transition-colors shadow-sm">{item.player.number}</span>
            </div>
          ))}
        </div>

        <h4 className="flex items-center gap-2 text-sm font-extrabold text-gray-400 mb-4 px-2 uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div> {t.match.substitutes}
        </h4>
        <div className="flex flex-col gap-2">
          {away.substitutes.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 text-sm">
              <span className="font-bold text-gray-600">{item.player.name}</span>
              <span className="w-6 h-6 flex items-center justify-center bg-white rounded text-xs font-bold text-gray-400 shadow-sm">{item.player.number}</span>
            </div>
          ))}
        </div>
        
        {away.coach && (
          <div className="mt-8 pt-5 border-t border-gray-100 flex items-center gap-4 bg-gray-50 rounded-xl p-4">
            <h4 className="text-sm font-black text-gray-400 uppercase">{t.match.coach}</h4>
            <span className="font-bold text-gray-800">{away.coach.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
