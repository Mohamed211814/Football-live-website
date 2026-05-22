export const ARABIC_COMPETITION_MAP: Record<number, string> = {
  135: 'الدوري الإيطالي الدرجة الأولى',
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
 * Reusable utility to safely map API-Football competition IDs to Arabic names.
 * Falls back to the original English name if the ID is not mapped.
 * 
 * @param id The API-Football league ID
 * @param fallbackName The original league name from the API to use as a fallback
 * @returns The Arabic name or the fallback name
 */
export function getArabicCompetitionName(id: number, fallbackName: string): string {
  if (id in ARABIC_COMPETITION_MAP) {
    return ARABIC_COMPETITION_MAP[id];
  }
  return fallbackName;
}
