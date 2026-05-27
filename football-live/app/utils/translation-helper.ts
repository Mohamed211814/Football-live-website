export const ARABIC_STATS_MAP: Record<string, string> = {
  'Shots on Goal': 'تسديدات على المرمى',
  'Shots off Goal': 'تسديدات خارج المرمى',
  'Total Shots': 'إجمالي التسديدات',
  'Blocked Shots': 'تسديدات تصدى لها الدفاع',
  'Shots insidebox': 'تسديدات من داخل المنطقة',
  'Shots outsidebox': 'تسديدات من خارج المنطقة',
  'Fouls': 'الأخطاء',
  'Corner Kicks': 'الضربات الركنية',
  'Offsides': 'التسلل',
  'Ball Possession': 'الاستحواذ',
  'Yellow Cards': 'البطاقات الصفراء',
  'Red Cards': 'البطاقات الحمراء',
  'Goalkeeper Saves': 'تصديات الحارس',
  'Total passes': 'إجمالي التمريرات',
  'Passes accurate': 'تمريرات ناجحة',
  'Passes %': 'دقة التمرير',
  'Expected Goals': 'الأهداف المتوقعة',
  'Tackles': 'العرقلة الناجحة',
  'Interceptions': 'قطع الكرات',
  'Clearances': 'تشتيت الكرة',
};

export const ARABIC_EVENTS_MAP: Record<string, string> = {
  // Cards
  'Yellow Card': 'بطاقة صفراء',
  'Red Card': 'بطاقة حمراء',
  'Second Yellow Card': 'بطاقة صفراء ثانية',
  
  // Goals
  'Normal Goal': 'هدف',
  'Own Goal': 'هدف في مرماه',
  'Penalty': 'ركلة جزاء',
  'Missed Penalty': 'ركلة جزاء ضائعة',
  
  // VAR / Decisions
  'Goal confirmed': 'تأكيد الهدف',
  'Goal cancelled': 'إلغاء الهدف',
  'Penalty confirmed': 'تأكيد ركلة الجزاء',
  'Penalty cancelled': 'إلغاء ركلة الجزاء',
  'Card upgrade': 'ترقية البطاقة',
  'Goal Disallowed - offside': 'إلغاء هدف - تسلل',
  'Goal Disallowed - foul': 'إلغاء هدف - خطأ',
  'Goal Disallowed': 'إلغاء هدف',
  
  // Event Types (Fallback / Headings)
  'Goal': 'هدف',
  'Card': 'بطاقة',
  'subst': 'تبديل',
  'Var': 'تقنية الفيديو',
  'Substitution': 'تبديل',
};

/**
 * Utility to translate match statistic names into Arabic if locale is 'ar'
 */
export function getArabicStatName(statType: string, locale: string): string {
  if (locale === 'ar' && statType in ARABIC_STATS_MAP) {
    return ARABIC_STATS_MAP[statType];
  }
  return statType;
}

/**
 * Utility to translate match event details or types into Arabic if locale is 'ar'
 */
export function getArabicEventDetail(detail: string, locale: string): string {
  if (locale === 'ar' && detail in ARABIC_EVENTS_MAP) {
    return ARABIC_EVENTS_MAP[detail];
  }
  
  // Try partial match if not exact match (e.g. "Substitution 1" -> "تبديل")
  if (locale === 'ar') {
    for (const [eng, ar] of Object.entries(ARABIC_EVENTS_MAP)) {
      if (detail.toLowerCase().includes(eng.toLowerCase())) {
        return ar;
      }
    }
  }
  
  return detail;
}
