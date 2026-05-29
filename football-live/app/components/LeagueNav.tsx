"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

const NAV_LEAGUES = [
  // ... (keep existing leagues)
  { id: 39, nameAr: 'الدوري الإنجليزي', nameEn: 'Premier League' },
  { id: 140, nameAr: 'الدوري الإسباني', nameEn: 'La Liga' },
  { id: 135, nameAr: 'الدوري الإيطالي', nameEn: 'Serie A' },
  { id: 78, nameAr: 'الدوري الألماني', nameEn: 'Bundesliga' },
  { id: 61, nameAr: 'الدوري الفرنسي', nameEn: 'Ligue 1' },
  { id: 233, nameAr: 'الدوري المصري', nameEn: 'Egyptian PL' },
  { id: 208, nameAr: 'الدوري السعودي', nameEn: 'Saudi Pro League' },
  { id: 200, nameAr: 'الدوري المغربي', nameEn: 'Botola Pro' },
  { id: 305, nameAr: 'الدوري القطري', nameEn: 'Stars League' },
  { id: 236, nameAr: 'الدوري التونسي', nameEn: 'Tunisian Ligue 1' },
  { id: 186, nameAr: 'الدوري الجزائري', nameEn: 'Algerian Ligue 1' },
  { id: 219, nameAr: 'الدوري الإماراتي', nameEn: 'UAE Pro League' },
  { id: 330, nameAr: 'الدوري الكويتي', nameEn: 'Kuwait PL' },
  { id: 417, nameAr: 'الدوري البحريني', nameEn: 'Bahrain PL' },
  { id: 895, nameAr: 'كأس الرابطة المصرية', nameEn: 'Egypt League Cup' },
  { id: 253, nameAr: 'الدوري الأمريكي', nameEn: 'MLS' },
  { id: 79, nameAr: 'الدرجة الثانية (ألمانيا)', nameEn: '2. Bundesliga' },
  { id: 41, nameAr: 'الدرجة الثالثة (إنجلترا)', nameEn: 'League One' },
  { id: 921, nameAr: 'أوروبا تحت 17', nameEn: 'UEFA U17' },
  { id: 973, nameAr: 'كأس أمم أفريقيا للناشئين تحت 17 سنة', nameEn: 'CAF U-17' },
  { id: 13, nameAr: 'كوبا ليبرتادوريس', nameEn: 'Copa Libertadores' },
  { id: 11, nameAr: 'كوبا سود أمريكانا', nameEn: 'Copa Sudamericana' },
];

export default function LeagueNav() {
  const { locale, isRTL } = useLanguage();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentLeagueId = searchParams.get('league');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const basePath = pathname || '/';

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      if (scrollWidth <= clientWidth + 2) {
        setShowLeftArrow(false);
        setShowRightArrow(false);
        return;
      }

      const absScroll = Math.abs(Math.round(scrollLeft));
      const maxScroll = scrollWidth - clientWidth;
      
      const isAtStart = absScroll <= 2;
      const isAtEnd = absScroll >= maxScroll - 2;

      if (isRTL) {
        // In RTL, Start is physical Right, End is physical Left
        setShowRightArrow(!isAtStart); // Show right arrow if NOT at start
        setShowLeftArrow(!isAtEnd);    // Show left arrow if NOT at end
      } else {
        // In LTR, Start is physical Left, End is physical Right
        setShowLeftArrow(!isAtStart);  // Show left arrow if NOT at start
        setShowRightArrow(!isAtEnd);   // Show right arrow if NOT at end
      }
    }
  };

  useEffect(() => {
    // Restore scroll position on mount
    const savedScroll = sessionStorage.getItem('leagueNavScroll');
    if (savedScroll && scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = parseInt(savedScroll, 10);
    }

    checkScroll();
    const t = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', checkScroll);
    };
  }, [isRTL, currentLeagueId]);

  const handleScroll = () => {
    checkScroll();
    if (scrollContainerRef.current) {
      sessionStorage.setItem('leagueNavScroll', scrollContainerRef.current.scrollLeft.toString());
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      const moveBy = direction === 'left' ? -scrollAmount : scrollAmount;
      scrollContainerRef.current.scrollBy({ left: moveBy, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#7a1818] border-t border-white/10 shadow-inner">
      {/* Force LTR here so the DOM order matches physical screen position (Left arrow = left side) */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-2 flex items-center justify-between gap-1 sm:gap-2" dir="ltr">
        
        {/* Physical Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all shadow-md ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="flex-1 flex overflow-x-auto scrollbar-thin-white px-2 pb-1.5 pt-1 gap-2 md:gap-3 items-center snap-x"
        >
          {/* "All Matches" Button */}
          <Link
            href={basePath}
            className={`flex items-center whitespace-nowrap px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 snap-start
              ${!currentLeagueId 
                ? 'bg-white text-[#8B1E1E] shadow-md scale-105' 
                : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent'
              }`}
          >
            {locale === 'ar' ? 'جميع المباريات' : 'All Matches'}
          </Link>

          {/* League Buttons */}
          {NAV_LEAGUES.map((league) => {
            const isActive = currentLeagueId === String(league.id);

            return (
              <Link
                key={league.id}
                href={`${basePath}?league=${league.id}`}
                className={`flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 snap-start
                  ${isActive 
                    ? 'bg-white text-[#8B1E1E] shadow-md scale-105' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20'
                  }`}
              >
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image 
                    src={`https://media.api-sports.io/football/leagues/${league.id}.png`} 
                    alt={league.nameEn} 
                    fill
                    className="object-contain"
                    sizes="20px"
                  />
                </div>
                <span>{locale === 'ar' ? league.nameAr : league.nameEn}</span>
              </Link>
            );
          })}
        </div>

        {/* Physical Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-all shadow-md ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>

      </div>
    </div>
  );
}
