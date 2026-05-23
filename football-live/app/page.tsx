import DateBar from "./components/DateBar";
import DayTabs from "./components/DayTabs";
import MatchList from "./components/MatchList";
import { fetchFixtures } from "./utils/api-football";

export default async function Home(props: { searchParams: Promise<{ day?: string }> }) {
  const searchParams = await props.searchParams;
  const dayParam = (searchParams?.day as "yesterday" | "today" | "tomorrow") || "today";

  const targetDate = new Date();
  let title = "مباريات اليوم";

  if (dayParam === "yesterday") {
    targetDate.setDate(targetDate.getDate() - 1);
    title = "مباريات الأمس";
  } else if (dayParam === "tomorrow") {
    targetDate.setDate(targetDate.getDate() + 1);
    title = "مباريات الغد";
  }

  const matchesData = await fetchFixtures(targetDate);

  const totalMatches = matchesData.reduce(
    (acc, league) => acc + league.matches.length,
    0
  );
  const liveMatches = matchesData.reduce(
    (acc, league) =>
      acc + league.matches.filter((m) => m.status === "live").length,
    0
  );
  const finishedMatches = matchesData.reduce(
    (acc, league) =>
      acc + league.matches.filter((m) => m.status === "finished").length,
    0
  );

  return (
    <div className="py-5">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white rounded-xl border border-gray-200/80 p-3 text-center shadow-sm">
            <p className="text-2xl font-extrabold text-[#8B1E1E]">
              {totalMatches}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">إجمالي المباريات</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200/80 p-3 text-center shadow-sm">
            <p className="text-2xl font-extrabold text-red-600">
              {liveMatches}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">مباشر الآن</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200/80 p-3 text-center shadow-sm">
            <p className="text-2xl font-extrabold text-gray-500">
              {finishedMatches}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">انتهت</p>
          </div>
        </div>

        <DayTabs activeTab={dayParam} />

        <DateBar date={targetDate} title={title} />

        {/* League sections */}
        <MatchList leagues={matchesData} />
      </div>
    </div>
  );
}
