import { APIStatistics } from "../../../types";

export default function MatchStats({ statistics }: { statistics: APIStatistics[] }) {
  if (!statistics || statistics.length < 2) {
    return <div className="text-center text-gray-500 py-10 font-bold">الإحصائيات غير متاحة لهذه المباراة.</div>;
  }

  const homeStats = statistics[0].statistics;
  const awayStats = statistics[1].statistics;

  return (
    <div className="flex flex-col gap-5 py-4 px-2 md:px-8">
      {/* Team Logos Header for Stats */}
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex flex-col items-center gap-2">
          <img src={statistics[0].team.logo} className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md" alt={statistics[0].team.name} />
          <span className="font-extrabold text-xs text-gray-500">{statistics[0].team.name}</span>
        </div>
        <div className="text-sm font-black text-gray-300 tracking-widest">مقابل</div>
        <div className="flex flex-col items-center gap-2">
          <img src={statistics[1].team.logo} className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-md" alt={statistics[1].team.name} />
          <span className="font-extrabold text-xs text-gray-500">{statistics[1].team.name}</span>
        </div>
      </div>

      {homeStats.map((stat, idx) => {
        const homeValRaw = stat.value !== null ? String(stat.value).replace('%', '') : '0';
        const awayValRaw = awayStats[idx]?.value !== null ? String(awayStats[idx]?.value).replace('%', '') : '0';
        
        const homeVal = Number(homeValRaw) || 0;
        const awayVal = Number(awayValRaw) || 0;
        const total = homeVal + awayVal || 1; 

        const homeWidth = `${(homeVal / total) * 100}%`;
        const awayWidth = `${(awayVal / total) * 100}%`;

        // Highlight the higher number
        const homeWon = homeVal > awayVal;
        const awayWon = awayVal > homeVal;

        return (
          <div key={idx} className="flex flex-col gap-2 group">
            <div className="flex justify-between items-center px-1">
              <span className={`text-sm md:text-base font-black w-10 text-left transition-colors duration-200 ${homeWon ? "text-blue-600" : "text-gray-400"}`}>
                {stat.value !== null ? String(stat.value) : '0'}
              </span>
              
              <span className="text-xs md:text-sm font-extrabold text-gray-500 tracking-wide uppercase group-hover:text-gray-800 transition-colors duration-200">
                {stat.type}
              </span>
              
              <span className={`text-sm md:text-base font-black w-10 text-right transition-colors duration-200 ${awayWon ? "text-red-600" : "text-gray-400"}`}>
                {awayStats[idx]?.value !== null ? String(awayStats[idx]?.value) : '0'}
              </span>
            </div>
            
            {/* The progress bar */}
            <div className="flex w-full h-2.5 bg-gray-100/80 rounded-full overflow-hidden shadow-inner gap-1">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-r-full transition-all duration-700 ease-out" style={{ width: homeWidth }}></div>
              <div className="h-full bg-gradient-to-l from-red-400 to-red-600 rounded-l-full transition-all duration-700 ease-out" style={{ width: awayWidth }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
