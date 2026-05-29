export const ARABIC_COMPETITION_MAP: Record<number, string> = {
  2:   'دوري أبطال أوروبا',
  39:  'الدوري الإنجليزي الممتاز',
  140: 'الدوري الإسباني الدرجة الأولى',
  135: 'الدوري الإيطالي الدرجة الأولى',
  78:  'الدوري الألماني الدرجة الأولى',
  61:  'الدوري الفرنسي الدرجة الأولى',
  233: 'الدوري المصري الممتاز',
  200: 'الدوري المغربي البطولة الإحترافية',
  357: 'الدوري الأيرلندي الممتاز',
  186: 'الدوري الجزائري الدرجة الأولى',
  305: 'دوري النجوم القطري',
  208: 'الدوري السعودي للمحترفين',
  307: 'الدوري السعودي للمحترفين',
  236: 'الدوري التونسي الدرجة الأولى',
  219: 'دوري الإمارات للمحترفين',
  34:  'كأس آسيا للناشئين تحت 17 سنة',
  552: 'كأس تركيا',
  308: 'كأس رئيس الدولة الإماراتي',
  66:  'كأس فرنسا',
  11:  'كوبا سود أمريكانا',
  13:  'كوبا ليبرتادوريس',
  895: 'كأس الرابطة المصرية',
  921: 'بطولة أوروبا تحت 17 سنة',
  330: 'الدوري الكويتي الممتاز',
  828: 'الدوري التونسي الدرجة الثانية',
  417: 'الدوري البحريني تفادي الهبوط',
  41:  'الدوري الإنجليزي الدرجة الثالثة',
  253: 'الدوري الأمريكي MLS',
  79:  'الدوري الألماني تفادي الهبوط',
  973: 'كأس أمم أفريقيا للناشئين تحت 17 سنة',
};

export const ENGLISH_COMPETITION_MAP: Record<number, string> = {
  2:   'UEFA Champions League',
  39:  'Premier League',
  140: 'La Liga',
  135: 'Serie A',
  78:  'Bundesliga',
  61:  'Ligue 1',
  233: 'Egyptian Premier League',
  200: 'Botola Pro',
  357: 'Premier Division',
  186: 'Ligue 1',
  305: 'Stars League',
  208: 'Saudi Professional League',
  307: 'Saudi Professional League',
  236: 'Tunisian Ligue 1',
  219: 'UAE Pro League',
  34:  'AFC U17 Asian Cup',
  552: 'Turkish Cup',
  308: 'UAE Presidents Cup',
  66:  'Coupe de France',
  11:  'Copa Sudamericana',
  13:  'Copa Libertadores',
  895: 'Egyptian League Cup',
  921: 'UEFA U17 Championship',
  330: 'Kuwait Premier League',
  828: 'Tunisian Ligue 2',
  417: 'Bahrain PL Playoff',
  41:  'League One',
  253: 'Major League Soccer',
  79:  '2. Bundesliga Relegation Playoff',
  973: 'U17 Africa Cup of Nations',
};

export const ARABIC_COMPETITION_NAME_MAP: Record<string, string> = {
  'Premier League': 'الدوري الإنجليزي الممتاز',
  'La Liga': 'الدوري الإسباني الدرجة الأولى',
  'Serie A': 'الدوري الإيطالي الدرجة الأولى',
  'Bundesliga': 'الدوري الألماني الدرجة الأولى',
  'Ligue 1': 'الدوري الفرنسي الدرجة الأولى',
  'Champions League': 'دوري أبطال أوروبا',
  'UEFA Champions League': 'دوري أبطال أوروبا',
  'UEFA Europa League': 'الدوري الأوروبي',
  'Saudi Pro League': 'الدوري السعودي للمحترفين',
  'Egyptian Premier League': 'الدوري المصري الممتاز',
  'Botola Pro': 'الدوري المغربي البطولة الإحترافية',
};

export const ENGLISH_COMPETITION_NAME_MAP: Record<string, string> = {
  'الدوري الإنجليزي الممتاز': 'Premier League',
  'الدوري الإنجليزي': 'Premier League',
  'الدوري الإسباني الدرجة الأولى': 'La Liga',
  'الدوري الإسباني': 'La Liga',
  'الدوري الإيطالي الدرجة الأولى': 'Serie A',
  'الدوري الإيطالي': 'Serie A',
  'الدوري الألماني الدرجة الأولى': 'Bundesliga',
  'الدوري الألماني': 'Bundesliga',
  'الدوري الفرنسي الدرجة الأولى': 'Ligue 1',
  'الدوري الفرنسي': 'Ligue 1',
  'دوري أبطال أوروبا': 'UEFA Champions League',
  'الدوري الأوروبي': 'UEFA Europa League',
  'الدوري السعودي للمحترفين': 'Saudi Pro League',
  'الدوري السعودي': 'Saudi Pro League',
  'الدوري المصري الممتاز': 'Egyptian Premier League',
  'الدوري المصري': 'Egyptian Premier League',
  'الدوري المغربي البطولة الإحترافية': 'Botola Pro',
  'الدوري المغربي': 'Botola Pro',
};

/**
 * Get the Arabic name for a competition.
 * Falls back to the original API name if the ID is not mapped.
 */
export function getArabicCompetitionName(id: number, fallbackName: string): string {
  if (id in ARABIC_COMPETITION_MAP) {
    return ARABIC_COMPETITION_MAP[id];
  }
  if (fallbackName in ARABIC_COMPETITION_NAME_MAP) {
    return ARABIC_COMPETITION_NAME_MAP[fallbackName];
  }
  return fallbackName;
}

/**
 * Get the competition name for a given locale.
 * Arabic uses the mapped name, English uses the original API name.
 */
export function getCompetitionName(id: number | undefined, apiName: string, locale: 'ar' | 'en'): string {
  if (!apiName) return '';
  
  if (locale === 'ar') {
    if (id && id in ARABIC_COMPETITION_MAP) {
      return ARABIC_COMPETITION_MAP[id];
    }
    if (apiName in ARABIC_COMPETITION_NAME_MAP) {
      return ARABIC_COMPETITION_NAME_MAP[apiName];
    }
    return apiName;
  } else {
    if (id && id in ENGLISH_COMPETITION_MAP) {
      return ENGLISH_COMPETITION_MAP[id];
    }
    if (apiName in ENGLISH_COMPETITION_NAME_MAP) {
      return ENGLISH_COMPETITION_NAME_MAP[apiName];
    }
    return apiName;
  }
}
