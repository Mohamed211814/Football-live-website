import { Suspense } from "react";
import { fetchFixtures } from "./utils/api-football";
import HomeDashboard from "./components/HomeDashboard";

export default async function Home() {
  const dayParam = "today";

  // Fetch ALL matches for the day. Filtering will happen on the client.
  const matchesData = await fetchFixtures(0); // 0 = today
  
  const targetDate = new Date();

  return (
    <div className="py-5">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl"></div>}>
          <HomeDashboard 
            initialMatchesData={matchesData} 
            targetDate={targetDate} 
            dayParam={dayParam} 
          />
        </Suspense>
      </div>
    </div>
  );
}
