import DateBar from "./components/DateBar";
import DayTabs from "./components/DayTabs";
import MatchList from "./components/MatchList";
import HomeStats from "./components/HomeStats";
import { fetchFixtures } from "./utils/api-football";

export default async function Home(props: { searchParams: Promise<{ day?: string }> }) {
  const searchParams = await props.searchParams;
  const dayParam = (searchParams?.day as "yesterday" | "today" | "tomorrow") || "today";

  const targetDate = new Date();

  if (dayParam === "yesterday") {
    targetDate.setDate(targetDate.getDate() - 1);
  } else if (dayParam === "tomorrow") {
    targetDate.setDate(targetDate.getDate() + 1);
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
        <HomeStats 
          totalMatches={totalMatches} 
          liveMatches={liveMatches} 
          finishedMatches={finishedMatches} 
        />

        <DayTabs activeTab={dayParam} />

        <DateBar date={targetDate} dayParam={dayParam} />

        {/* League sections */}
        <MatchList leagues={matchesData} />
      </div>
    </div>
  );
}
