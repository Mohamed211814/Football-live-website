'use client';

import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 pb-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <p className="text-gray-500 text-sm mb-2">
            {t.footer.about}
          </p>
          <p className="text-gray-400 text-xs">
            {t.footer.copyright.replace('{year}', String(new Date().getFullYear()))}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="inline-block w-2 h-2 rounded-full bg-[#8B1E1E]/30" />
            <span className="text-gray-300 text-xs">{t.footer.streamLabel}</span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#8B1E1E]/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
