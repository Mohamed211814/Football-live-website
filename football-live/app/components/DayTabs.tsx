import Link from "next/link";

type TabKey = "yesterday" | "today" | "tomorrow";

interface Tab {
  key: TabKey;
  label: string;
  icon: string;
  bgColor: string;
  bgHover: string;
  bgActive: string;
  ringColor: string;
}

const tabs: Tab[] = [
  {
    key: "yesterday",
    label: "مباريات الأمس",
    icon: "⏪",
    bgColor: "bg-blue-600",
    bgHover: "hover:bg-blue-700",
    bgActive: "bg-blue-700 ring-2 ring-blue-300 shadow-lg shadow-blue-500/25",
    ringColor: "bg-blue-400",
  },
  {
    key: "today",
    label: "مباريات اليوم",
    icon: "🔴",
    bgColor: "bg-red-600",
    bgHover: "hover:bg-red-700",
    bgActive: "bg-red-700 ring-2 ring-red-300 shadow-lg shadow-red-500/25",
    ringColor: "bg-red-400",
  },
  {
    key: "tomorrow",
    label: "مباريات الغد",
    icon: "⏩",
    bgColor: "bg-yellow-500",
    bgHover: "hover:bg-yellow-600",
    bgActive:
      "bg-yellow-600 ring-2 ring-yellow-300 shadow-lg shadow-yellow-500/25",
    ringColor: "bg-yellow-300",
  },
];

interface DayTabsProps {
  activeTab: TabKey;
}

export default function DayTabs({ activeTab }: DayTabsProps) {
  return (
    <div className="w-full mb-4">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-1 py-1 -mx-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Link
              key={tab.key}
              id={`tab-${tab.key}`}
              href={`/?day=${tab.key}`}
              className={`
                relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white
                whitespace-nowrap shrink-0 cursor-pointer
                transition-all duration-300 ease-out
                ${tab.bgColor}
                ${isActive ? tab.bgActive + " scale-[1.03]" : tab.bgHover + " opacity-85 hover:opacity-100"}
              `}
            >
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2">
                  <span className={`block w-1.5 h-1.5 rounded-full ${tab.ringColor} animate-pulse`} />
                </span>
              )}

              <span className="text-base leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
