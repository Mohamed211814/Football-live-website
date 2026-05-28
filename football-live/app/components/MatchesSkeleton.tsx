export default function MatchesSkeleton() {
  return (
    <div className="py-5">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        {/* Stats Skeleton */}
        <div className="flex gap-2 md:gap-4 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={`stat-${i}`} className="flex-1 bg-white h-[72px] md:h-[88px] rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm animate-pulse" />
          ))}
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-2 overflow-x-hidden mb-4 px-1">
          {[1, 2, 3].map((i) => (
            <div key={`tab-${i}`} className="h-10 md:h-11 w-28 md:w-32 bg-gray-200 rounded-xl animate-pulse shrink-0" />
          ))}
        </div>

        {/* Date Bar Skeleton */}
        <div className="h-12 md:h-14 bg-gray-200 rounded-xl mb-4 animate-pulse" />

        {/* Competitions Skeleton */}
        <div className="space-y-4">
          {[1, 2].map((comp) => (
            <div key={`comp-${comp}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between px-3 md:px-4 py-3 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-gray-200 rounded-full animate-pulse" />
                  <div className="w-32 md:w-48 h-4 md:h-5 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
              
              {/* Matches */}
              <div className="flex flex-col">
                {[1, 2, 3].map((match) => (
                  <div key={`match-${comp}-${match}`} className="flex items-center justify-between px-2 sm:px-3 md:px-5 py-3 md:py-4 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2 md:gap-3 flex-1">
                      <div className="w-7 h-7 md:w-9 md:h-9 bg-gray-200 rounded-full animate-pulse shrink-0" />
                      <div className="w-20 md:w-28 h-3 md:h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    
                    <div className="flex flex-col items-center gap-1.5 px-4">
                      <div className="w-10 md:w-12 h-3 md:h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-14 md:w-16 h-2 md:h-3 bg-gray-100 rounded animate-pulse" />
                    </div>
                    
                    <div className="flex items-center justify-end gap-2 md:gap-3 flex-1">
                      <div className="w-20 md:w-28 h-3 md:h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-7 h-7 md:w-9 md:h-9 bg-gray-200 rounded-full animate-pulse shrink-0" />
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
