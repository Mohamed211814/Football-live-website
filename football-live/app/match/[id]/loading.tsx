export default function Loading() {
  return (
    <div className="py-5" dir="rtl">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        {/* Header Skeleton */}
        <div className="bg-[#8B1E1E]/20 animate-pulse rounded-xl h-[180px] mt-4 relative overflow-hidden">
          <div className="flex justify-between items-center h-full p-6">
            <div className="w-20 h-20 bg-black/10 rounded-full"></div>
            <div className="w-24 h-12 bg-black/10 rounded-lg"></div>
            <div className="w-20 h-20 bg-black/10 rounded-full"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex bg-white rounded-xl border border-gray-200/80 p-1 mt-4 animate-pulse">
           <div className="flex-1 h-10 bg-gray-200 rounded-lg mx-1"></div>
           <div className="flex-1 h-10 bg-gray-100 rounded-lg mx-1"></div>
           <div className="flex-1 h-10 bg-gray-100 rounded-lg mx-1"></div>
        </div>

        {/* Content Skeleton */}
        <div className="mt-4 bg-white rounded-xl border border-gray-200/80 shadow-sm p-4 min-h-[400px] animate-pulse">
           <div className="w-1/2 h-4 bg-gray-200 rounded mb-4"></div>
           <div className="w-3/4 h-4 bg-gray-100 rounded mb-4"></div>
           <div className="w-1/3 h-4 bg-gray-100 rounded mb-4"></div>
        </div>
      </div>
    </div>
  );
}
