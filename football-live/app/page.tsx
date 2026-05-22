import Header from "./components/Header";
import Footer from "./components/Footer";
import DateBar from "./components/DateBar";
import DayTabs from "./components/DayTabs";
import MatchesList from "./components/MatchesList";
import { fetchFixtures } from "./utils/api-football";

export default async function Home() {
  const matchesData = await fetchFixtures(new Date());

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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-5">
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

          <DayTabs />

          <DateBar />

          {/* League sections */}
          <MatchesList leagues={matchesData} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
