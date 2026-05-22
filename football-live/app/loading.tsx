export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#8B1E1E] rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold text-gray-700 animate-pulse">جاري تحميل المباريات...</h2>
      <p className="text-gray-400 text-sm mt-2">يرجى الانتظار قليلاً</p>
    </div>
  );
}
