import DateBar from "./components/DateBar";
import DayTabs from "./components/DayTabs";
import MatchList from "./components/MatchList";
import HomeStats from "./components/HomeStats";
import { fetchFixtures } from "./utils/api-football";

export default async function Home(props: { searchParams: Promise<{ day?: string, sort?: string }> }) {
  const searchParams = await props.searchParams;
  const dayParam = (searchParams?.day as "yesterday" | "today" | "tomorrow") || "today";
  const sortParam = searchParams?.sort;

  const targetDate = new Date();

  if (dayParam === "yesterday") {
    targetDate.setDate(targetDate.getDate() - 1);
  } else if (dayParam === "tomorrow") {
    targetDate.setDate(targetDate.getDate() + 1);
  }

  let matchesData = await fetchFixtures(targetDate);

  if (sortParam === "live") {
    // Sort leagues: leagues with live matches first
    matchesData.sort((a, b) => {
      const aLive = a.matches.some((m) => m.status === "live") ? 1 : 0;
      const bLive = b.matches.some((m) => m.status === "live") ? 1 : 0;
      return bLive - aLive;
    });

    // Sort matches within leagues: live matches first
    matchesData = matchesData.map((league) => {
      const sortedMatches = [...league.matches].sort((a, b) => {
        const aLive = a.status === "live" ? 1 : 0;
        const bLive = b.status === "live" ? 1 : 0;
        return bLive - aLive;
      });
      return { ...league, matches: sortedMatches };
    });
  }

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
