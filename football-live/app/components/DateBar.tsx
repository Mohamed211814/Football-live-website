'use client';

import { useLanguage } from "../context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function DateBar({ date, dayParam }: { date: Date, dayParam: "yesterday" | "today" | "tomorrow" }) {
  const { t, locale, isRTL } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLiveSort = searchParams.get('sort') === 'live';

  const toggleLiveSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isLiveSort) {
      params.delete('sort');
    } else {
      params.set('sort', 'live');
    }
    router.push(`/?${params.toString()}`);
  };

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateStr = date.toLocaleDateString(locale === 'ar' ? "ar-SA-u-nu-latn" : "en-US", options);

  let title = t.home.today;
  if (dayParam === "yesterday") title = t.home.yesterday;
  if (dayParam === "tomorrow") title = t.home.tomorrow;

  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200/80 px-4 py-3 mb-4 shadow-sm" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-[#8B1E1E]/10 rounded-lg flex items-center justify-center">
          <svg
            className="w-4 h-4 text-[#8B1E1E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">{title}</p>
          <p className="text-[11px] text-gray-400">{dateStr}</p>
        </div>
      </div>
      <div 
        className={`flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg transition-all active:scale-95 ${isLiveSort ? 'bg-red-50' : 'hover:bg-gray-50'}`}
        onClick={toggleLiveSort}
        style={{ cursor: 'pointer' }}
      >
        <span className="live-dot w-2 h-2 rounded-full bg-red-500 inline-block" />
        <span className="text-xs font-semibold text-red-600 select-none">{t.common.liveStream}</span>
      </div>
    </div>
  );
}
