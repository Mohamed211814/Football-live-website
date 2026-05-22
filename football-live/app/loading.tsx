export default function Loading() {
  return (
    <div className="py-5" dir="rtl">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        
        {/* Stats Skeletons */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200/80 p-3 h-[84px] animate-pulse shadow-sm"></div>
          ))}
        </div>

        {/* Day Tabs Skeleton */}
        <div className="flex justify-between items-center bg-white rounded-xl p-2 mb-4 border border-gray-200/80 animate-pulse h-[60px] shadow-sm">
          <div className="w-1/3 h-[44px] bg-gray-100 rounded-lg mx-1"></div>
          <div className="w-1/3 h-[44px] bg-gray-100 rounded-lg mx-1"></div>
          <div className="w-1/3 h-[44px] bg-gray-100 rounded-lg mx-1"></div>
        </div>

        {/* Date Bar Skeleton */}
        <div className="flex justify-center items-center py-2 mb-4 animate-pulse">
           <div className="w-32 h-6 bg-gray-200 rounded-md"></div>
        </div>

        {/* League Sections Skeletons */}
        <div className="space-y-4 md:space-y-5 mt-4">
          {[1, 2, 3].map((leagueIdx) => (
            <div key={leagueIdx} className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm animate-pulse">
              {/* League Header Skeleton */}
              <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 border-r-2 border-r-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="w-32 md:w-48 h-5 bg-gray-200 rounded-md"></div>
                </div>
              </div>
              
              {/* Match Rows Skeletons */}
              <div className="flex flex-col">
                {[1, 2].map((matchIdx) => (
                  <div key={matchIdx} className="flex items-center justify-between px-3 md:px-5 py-3 md:py-3.5 border-b border-gray-100 last:border-b-0">
                    {/* Home Team */}
                    <div className="flex items-center gap-2.5 md:gap-3 flex-1">
                      <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-full flex-shrink-0"></div>
                      <div className="w-20 md:w-24 h-4 bg-gray-200 rounded-md"></div>
                    </div>
                    {/* Time/Score */}
                    <div className="flex flex-col items-center justify-center px-2 flex-shrink-0 min-w-[70px] md:min-w-[90px]">
                       <div className="w-10 h-5 bg-gray-200 rounded-md mb-1.5"></div>
                       <div className="w-16 h-3 bg-gray-200 rounded-md"></div>
                    </div>
                    {/* Away Team */}
                    <div className="flex items-center justify-end gap-2.5 md:gap-3 flex-1">
                      <div className="w-20 md:w-24 h-4 bg-gray-200 rounded-md"></div>
                      <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-full flex-shrink-0"></div>
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
