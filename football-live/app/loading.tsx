export default function Loading() {
  return (
    <div className="py-5" dir="rtl">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        
        {/* Stats Skeletons */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200/80 p-3 animate-pulse shadow-sm">
              <div className="w-10 h-6 bg-gray-200 rounded mx-auto mb-2"></div>
              <div className="w-16 h-3 bg-gray-100 rounded mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Day Tabs Skeleton */}
        <div className="flex items-center gap-2 mb-4 animate-pulse">
          <div className="flex-1 h-[42px] bg-blue-200/40 rounded-xl"></div>
          <div className="flex-1 h-[42px] bg-red-200/40 rounded-xl"></div>
          <div className="flex-1 h-[42px] bg-yellow-200/40 rounded-xl"></div>
        </div>

        {/* Date Bar Skeleton */}
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200/80 px-4 py-3 mb-4 animate-pulse shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
            <div>
              <div className="w-20 h-4 bg-gray-200 rounded mb-1"></div>
              <div className="w-28 h-3 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="w-16 h-4 bg-red-100 rounded"></div>
        </div>

        {/* Competition Section Skeletons */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((leagueIdx) => (
            <div key={leagueIdx} className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-sm animate-pulse">
              {/* Competition Header Skeleton */}
              <div className="flex items-center justify-between px-3 md:px-4 py-2.5 md:py-3 bg-white border-b border-gray-200 border-r-[3px] border-r-gray-200">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-gray-200 rounded-full"></div>
                  <div className="w-32 md:w-44 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-14 h-3 bg-gray-100 rounded"></div>
              </div>
              
              {/* Match Row Skeletons */}
              <div className="flex flex-col">
                {[1, 2, 3].map((matchIdx) => (
                  <div key={matchIdx} className="flex items-center justify-between px-2 sm:px-3 md:px-5 py-2.5 sm:py-3 md:py-3.5 border-b border-gray-50 last:border-b-0 bg-[#fafafa]">
                    {/* Home Team */}
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-200 rounded-full flex-shrink-0"></div>
                      <div className="w-16 sm:w-20 md:w-24 h-3.5 bg-gray-200 rounded"></div>
                    </div>
                    {/* Time/Score */}
                    <div className="flex flex-col items-center justify-center px-1 sm:px-2 md:px-4 flex-shrink-0 min-w-[56px] sm:min-w-[68px] md:min-w-[88px]">
                      <div className="w-8 sm:w-10 h-4 sm:h-5 bg-gray-200 rounded mb-1"></div>
                      <div className="w-12 sm:w-14 h-2.5 bg-gray-100 rounded"></div>
                    </div>
                    {/* Away Team */}
                    <div className="flex items-center justify-end gap-1.5 sm:gap-2 md:gap-3 flex-1">
                      <div className="w-16 sm:w-20 md:w-24 h-3.5 bg-gray-200 rounded"></div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gray-200 rounded-full flex-shrink-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
