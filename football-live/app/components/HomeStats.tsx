'use client';

import { useLanguage } from "../context/LanguageContext";

interface HomeStatsProps {
  totalMatches: number;
  liveMatches: number;
  finishedMatches: number;
}

export default function HomeStats({ totalMatches, liveMatches, finishedMatches }: HomeStatsProps) {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`grid grid-cols-3 gap-3 mb-4 ${isRTL ? '' : 'flex-row-reverse'}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="bg-white rounded-xl border border-gray-200/80 p-3 text-center shadow-sm">
        <p className="text-2xl font-extrabold text-[#8B1E1E]">
          {totalMatches}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5">{t.home.totalMatches}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200/80 p-3 text-center shadow-sm">
        <p className="text-2xl font-extrabold text-red-600">
          {liveMatches}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5">{t.home.liveNow}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200/80 p-3 text-center shadow-sm">
        <p className="text-2xl font-extrabold text-gray-500">
          {finishedMatches}
        </p>
        <p className="text-[11px] text-gray-400 mt-0.5">{t.home.finished}</p>
      </div>
    </div>
  );
}
