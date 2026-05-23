import { APIEvent } from "../../../types";

export default function MatchEvents({ events, homeTeamId }: { events: APIEvent[], homeTeamId?: number }) {
  if (!events || events.length === 0) {
    return <div className="text-center text-gray-500 py-10 font-bold">لا توجد أحداث متاحة لهذه المباراة حالياً.</div>;
  }

  return (
    <div className="relative flex flex-col gap-0 py-6 px-2 md:px-6">
      {/* Center vertical line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-gray-100 via-gray-300 to-gray-100 -translate-x-1/2"></div>

      {events.map((event, idx) => {
        const isHome = event.team.id === homeTeamId;
        
        let icon = "⚽";
        let iconBg = "bg-green-100 text-green-600 border-green-200";
        if (event.type === "Card") {
          if (event.detail.includes("Yellow")) {
            icon = "🟨"; iconBg = "bg-yellow-100 border-yellow-300";
          } else {
            icon = "🟥"; iconBg = "bg-red-100 border-red-300";
          }
        } else if (event.type === "subst") {
          icon = "🔄"; iconBg = "bg-blue-100 text-blue-600 border-blue-200";
        } else if (event.type === "Var") {
          icon = "📺"; iconBg = "bg-purple-100 text-purple-600 border-purple-200";
        }

        return (
          <div key={idx} className={`relative flex items-center w-full my-4 group ${isHome ? "flex-row" : "flex-row-reverse"}`}>
            
            {/* Empty space for balance */}
            <div className="flex-1"></div>

            {/* Event Time Badge (Center) */}
            <div className="w-14 h-14 shrink-0 flex items-center justify-center bg-white rounded-full border-4 border-gray-50 shadow-md mx-4 z-10 font-black text-gray-700 group-hover:scale-110 transition-transform duration-300">
              {event.time.elapsed}'
            </div>

            {/* Event Details Card */}
            <div className={`flex flex-col flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative ${isHome ? "text-right" : "text-left"}`}>
              {/* Pointing triangle */}
              <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-gray-100 transform rotate-45 ${isHome ? "-right-1.5 border-t-0 border-r-0 border-b border-l" : "-left-1.5"}`}></div>
              
              <div className={`flex items-center gap-3 mb-1 ${isHome ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border shadow-inner ${iconBg}`}>
                  {icon}
                </div>
                <span className="font-extrabold text-gray-800 text-sm md:text-base">
                  {event.player.name}
                </span>
              </div>
              
              <span className="text-xs md:text-sm text-gray-500 font-bold">
                {event.detail} {event.assist.name ? <span className="text-[#8B1E1E]">({event.assist.name})</span> : ""}
              </span>
            </div>
            
          </div>
        );
      })}
    </div>
  );
}
