'use client';

import { useEffect } from 'react';
import { useLanguage } from "./context/LanguageContext";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <div className="bg-red-50 text-red-600 p-4 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.error.title}</h2>
      <p className="text-gray-500 mb-6">{t.error.description}</p>
      
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-[#8B1E1E] text-white font-bold rounded-lg hover:bg-[#6d1616] transition-colors focus:ring-4 focus:ring-red-500/30"
      >
        {t.common.retry}
      </button>
    </div>
  );
}
