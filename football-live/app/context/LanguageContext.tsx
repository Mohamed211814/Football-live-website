'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ar from '../i18n/ar.json';
import en from '../i18n/en.json';

export type Locale = 'ar' | 'en';

type Translations = typeof ar;

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'ar',
  t: ar,
  toggleLanguage: () => {},
  isRTL: true,
});

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({ children, initialLocale = 'ar' }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // Sync state with localStorage/cookie if client has another preference
  useEffect(() => {
    const saved = localStorage.getItem('football-locale') as Locale | null;
    if (saved && (saved === 'en' || saved === 'ar') && saved !== locale) {
      setLocale(saved);
      document.cookie = `football-locale=${saved}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [locale]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale === 'ar' ? 'ar-u-nu-latn' : 'en';
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const toggleLanguage = useCallback(() => {
    const next: Locale = locale === 'ar' ? 'en' : 'ar';
    localStorage.setItem('football-locale', next);
    
    // Set cookie for SSR layout detection
    document.cookie = `football-locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
    
    setLocale(next);
    
    // Perform full reload so the server-side components (like MatchPage) rebuild in the new language
    window.location.reload();
  }, [locale]);

  const t = locale === 'ar' ? ar : en;
  const isRTL = locale === 'ar';

  return (
    <LanguageContext.Provider value={{ locale, t, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
