'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface NewsItem {
  id: string;
  headline: string;
  headlineAr: string;
  league: string;
  leagueAr: string;
  leagueBadge: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string;
  awayScore: string;
  date: string;
  thumbnail: string | null;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-4/5" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-8 w-28 bg-gray-100 rounded-full" />
          <div className="h-3 w-16 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

function NewsCard({ item, locale }: { item: NewsItem; locale: string }) {
  const headline = locale === 'ar' ? item.headlineAr : item.headline;
  const league = locale === 'ar' ? item.leagueAr : item.league;
  const isRTL = locale === 'ar';

  const formattedDate = new Date(item.date).toLocaleDateString(
    locale === 'ar' ? 'ar-EG' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' },
  );

  const homeScore = parseInt(item.homeScore);
  const awayScore = parseInt(item.awayScore);
  const isDraw = homeScore === awayScore;

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Thumbnail or gradient fallback */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        {item.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumbnail}
            alt={headline}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#8B1E1E] to-[#c0392b] flex items-center justify-center">
            <div className="text-white/20 text-8xl font-black select-none">⚽</div>
          </div>
        )}
        {/* League badge overlay */}
        <div className="absolute top-3 start-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <span>{item.leagueBadge}</span>
          <span>{league}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Score badge */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-sm font-bold text-gray-700 truncate max-w-[100px]">{item.homeTeam}</span>
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-black ${
              isDraw
                ? 'bg-gray-100 text-gray-600'
                : 'bg-[#8B1E1E]/10 text-[#8B1E1E]'
            }`}
          >
            <span>{item.homeScore}</span>
            <span className="text-gray-300">-</span>
            <span>{item.awayScore}</span>
          </div>
          <span className="text-sm font-bold text-gray-700 truncate max-w-[100px]">{item.awayTeam}</span>
        </div>

        {/* Headline */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 flex-1">
          {headline}
        </p>

        {/* Date */}
        <p className="text-xs text-gray-400 mt-3">{formattedDate}</p>
      </div>
    </div>
  );
}

export default function NewsFeed() {
  const { locale, isRTL, t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch('/api/news')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setNews(json.data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-5xl mb-4">📡</div>
        <p className="text-gray-500">{t.common.error}</p>
      </div>
    );
  }

  return (
    <div className="py-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full bg-[#8B1E1E]" />
        <h2 className="text-xl font-black text-gray-800">
          {locale === 'ar' ? 'آخر نتائج كرة القدم' : 'Latest Football Results'}
        </h2>
        <span className="ms-auto text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
          {locale === 'ar' ? 'مُحدَّث' : 'Updated'} ⚡
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
          : news.map((item) => (
              <NewsCard key={item.id} item={item} locale={locale} />
            ))}
      </div>

      {!loading && news.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-500">
            {locale === 'ar' ? 'لا توجد نتائج متاحة حالياً.' : 'No results available right now.'}
          </p>
        </div>
      )}

      {/* Attribution */}
      {!loading && news.length > 0 && (
        <p className="text-center text-xs text-gray-300 mt-8">
          {locale === 'ar' ? 'البيانات من TheSportsDB' : 'Data from TheSportsDB'}
        </p>
      )}
    </div>
  );
}
