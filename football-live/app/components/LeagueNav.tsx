"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";

const NAV_LEAGUES = [
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
  { id: 13, nameAr: 'كوبا ليبرتادوريس', nameEn: 'Copa Libertadores' },
  { id: 11, nameAr: 'كوبا سود أمريكانا', nameEn: 'Copa Sudamericana' },
];

export default function LeagueNav() {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();
  const currentLeagueId = searchParams.get('league');
  const currentDay = searchParams.get('day'); // Preserve day param when clicking leagues

  return (
    <div className="w-full bg-[#7a1818] border-t border-white/10 shadow-inner">
      <div className="max-w-5xl mx-auto px-2 sm:px-6">
        <div className="flex overflow-x-auto hide-scrollbar py-2.5 gap-2 md:gap-3 items-center snap-x">
          
          {/* "All Matches" Button */}
          <Link
            href={`/${currentDay ? `?day=${currentDay}` : ''}`}
            className={`flex items-center whitespace-nowrap px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all shrink-0 snap-start
              ${!currentLeagueId 
                ? 'bg-white text-[#8B1E1E] shadow-md scale-105' 
                : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
          >
            {locale === 'ar' ? 'جميع المباريات' : 'All Matches'}
          </Link>

          {/* League Buttons */}
          {NAV_LEAGUES.map((league) => {
            const isActive = currentLeagueId === String(league.id);
            const queryParams = new URLSearchParams();
            if (currentDay) queryParams.set('day', currentDay);
            queryParams.set('league', String(league.id));

            return (
              <Link
                key={league.id}
                href={`/?${queryParams.toString()}`}
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
      </div>
    </div>
  );
}
