"use client";
import Link from "next/link";

interface MatchTabsProps {
  activeTab: string;
  matchId: string;
}

export default function MatchTabs({ activeTab, matchId }: MatchTabsProps) {
  const tabs = [
    { id: "events", label: "الأحداث" },
    { id: "lineups", label: "التشكيلة" },
    { id: "stats", label: "الإحصائيات" },
  ];

  return (
    <div className="flex bg-white/60 backdrop-blur-md rounded-2xl border border-gray-200/60 p-1.5 shadow-sm relative z-20">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={`/match/${matchId}?tab=${tab.id}`}
            className={`flex-1 text-center py-3 rounded-xl font-bold text-sm transition-all duration-300 relative overflow-hidden ${
              isActive
                ? "text-white shadow-lg transform scale-[1.02]"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B1E1E] to-[#aa2222] -z-10 animate-fade-in"></div>
            )}
            <span className="relative z-10">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
