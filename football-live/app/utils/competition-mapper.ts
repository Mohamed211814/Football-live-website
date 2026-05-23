export const ARABIC_COMPETITION_MAP: Record<number, string> = {
  39:  'الدوري الإنجليزي الممتاز',
  140: 'الدوري الإسباني الدرجة الأولى',
  135: 'الدوري الإيطالي الدرجة الأولى',
  78:  'الدوري الألماني الدرجة الأولى',
  61:  'الدوري الفرنسي الدرجة الأولى',
  233: 'الدوري المصري الممتاز',
  200: 'الدوري المغربي البطولة الإحترافية',
  357: 'الدوري الجزائري الدرجة الأولى',
  34:  'كأس آسيا للناشئين تحت 17 سنة',
  552: 'كأس تركيا',
  308: 'كأس رئيس الدولة الإماراتي',
  66:  'كأس فرنسا',
  11:  'كوبا سود أمريكانا',
  13:  'كوبا ليبرتادوريس',
};

/**
 * Get the Arabic name for a competition.
 * Falls back to the original API name if the ID is not mapped.
 */
export function getArabicCompetitionName(id: number, fallbackName: string): string {
  if (id in ARABIC_COMPETITION_MAP) {
    return ARABIC_COMPETITION_MAP[id];
  }
  return fallbackName;
}

/**
 * Get the competition name for a given locale.
 * Arabic uses the mapped name, English uses the original API name.
 */
export function getCompetitionName(id: number, apiName: string, locale: 'ar' | 'en'): string {
  if (locale === 'ar' && id in ARABIC_COMPETITION_MAP) {
    return ARABIC_COMPETITION_MAP[id];
  }
  return apiName;
}
