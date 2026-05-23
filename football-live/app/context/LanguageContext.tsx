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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('football-locale') as Locale | null;
    if (saved === 'en' || saved === 'ar') {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale === 'ar' ? 'ar-u-nu-latn' : 'en';
    root.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const toggleLanguage = useCallback(() => {
    setLocale((prev) => {
      const next: Locale = prev === 'ar' ? 'en' : 'ar';
      localStorage.setItem('football-locale', next);
      return next;
    });
  }, []);

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
