import { fetchFixtureDetails } from "../../utils/api-football";
import MatchHeader from "./components/MatchHeader";
import MatchTabs from "./components/MatchTabs";
import MatchEvents from "./components/MatchEvents";
import MatchLineups from "./components/MatchLineups";
import MatchStats from "./components/MatchStats";

export default async function MatchPage(props: { params: Promise<{ id: string }>, searchParams: Promise<{ tab?: string }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const matchId = params.id;
  const currentTab = searchParams.tab || "events";

  const matchData = await fetchFixtureDetails(matchId);

  return (
    <div className="py-5 fade-in-up">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        {/* Header */}
        <MatchHeader match={matchData.match} />

        {/* Navigation Tabs */}
        <div className="mt-4">
          <MatchTabs activeTab={currentTab} matchId={matchId} />
        </div>

        {/* Tab Content */}
        <div className="mt-4 bg-white rounded-xl border border-gray-200/80 shadow-sm p-4 min-h-[400px]">
          {currentTab === "events" && <MatchEvents events={matchData.events} homeTeamId={matchData.lineups[0]?.team.id} />}
          {currentTab === "lineups" && <MatchLineups lineups={matchData.lineups} />}
          {currentTab === "stats" && <MatchStats statistics={matchData.statistics} />}
        </div>
      </div>
    </div>
  );
}

