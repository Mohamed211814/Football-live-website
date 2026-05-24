"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [activeTab, setActiveTab] = useState<"matches" | "news">("matches");
  const { t, locale, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main header */}
      <div className="bg-[#8B1E1E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Top row: logo/title right + nav center */}
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo & Title */}
            <Link href="/" className="flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
              {/* Icon */}
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg shadow-black/10">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 md:w-7 md:h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="12,2 13.5,7 12,5 10.5,7" fill="currentColor" stroke="none" />
                  <polygon points="12,22 13.5,17 12,19 10.5,17" fill="currentColor" stroke="none" />
                  <polygon points="2,12 7,10.5 5,12 7,13.5" fill="currentColor" stroke="none" />
                  <polygon points="22,12 17,10.5 19,12 17,13.5" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              {/* Title + Subtitle */}
              <div className="flex flex-col">
                <h1 className="text-white text-xl md:text-2xl font-extrabold tracking-tight leading-tight">
                  {t.header.title}
                </h1>
                <p className="text-white/60 text-[10px] md:text-xs font-medium leading-snug mt-0.5">
                  {t.header.subtitle}
                </p>
              </div>
            </Link>

            {/* Center Navigation */}
            <nav className="hidden sm:flex items-center gap-1 bg-white/[0.07] rounded-full p-1 border border-white/[0.06]">
              <button
                id="nav-matches"
                onClick={() => setActiveTab("matches")}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out cursor-pointer ${
                  activeTab === "matches"
                    ? "bg-white text-[#8B1E1E] shadow-lg shadow-black/10"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>⚽</span>
                  <span>{t.header.todaysMatches}</span>
                </span>
              </button>
              <button
                id="nav-news"
                onClick={() => setActiveTab("news")}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ease-out cursor-pointer ${
                  activeTab === "news"
                    ? "bg-white text-[#8B1E1E] shadow-lg shadow-black/10"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>📰</span>
                  <span>{t.header.news}</span>
                </span>
              </button>
            </nav>

            {/* Language Switcher + Mobile nav */}
            <div className="flex items-center gap-2">
              {/* Language Toggle Button */}
              <button
                id="lang-switcher"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-sm"
                title={locale === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
              </button>
            </div>
          </div>

          {/* Mobile: compact nav */}
          <nav className="flex sm:hidden items-center gap-1 bg-white/[0.07] rounded-full p-0.5 border border-white/[0.06] mb-3">
            <button
              id="nav-matches-mobile"
              onClick={() => setActiveTab("matches")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "matches"
                  ? "bg-white text-[#8B1E1E] shadow-md"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {t.header.todaysMatches}
            </button>
            <button
              id="nav-news-mobile"
              onClick={() => setActiveTab("news")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeTab === "news"
                  ? "bg-white text-[#8B1E1E] shadow-md"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {t.header.news}
            </button>
          </nav>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-[3px] bg-gradient-to-l from-[#8B1E1E] via-[#e74c3c] to-[#8B1E1E]" />
    </header>
  );
}
