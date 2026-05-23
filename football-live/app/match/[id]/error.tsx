'use client';

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-10 text-center flex flex-col items-center justify-center">
      <div className="bg-red-50 p-4 rounded-full mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">عذراً، لم نتمكن من جلب تفاصيل المباراة</h2>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        قد تكون المباراة غير موجودة أو حدث خطأ في الاتصال بالخادم.
      </p>
      
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-[#8B1E1E] text-white font-bold rounded-lg hover:bg-red-800 transition-colors"
        >
          إعادة المحاولة
        </button>
        <Link href="/" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
