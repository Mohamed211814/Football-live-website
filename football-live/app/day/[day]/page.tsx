import { Suspense } from "react";
import { fetchFixtures } from "../../utils/api-football";
import HomeDashboard from "../../components/HomeDashboard";
import { notFound } from "next/navigation";

// Statically generate these paths at build time
export function generateStaticParams() {
  return [{ day: "yesterday" }, { day: "tomorrow" }];
}

export default async function DayPage(props: { params: Promise<{ day: string }> }) {
  const params = await props.params;
  const dayParam = params.day;

  if (dayParam !== "yesterday" && dayParam !== "tomorrow") {
    notFound();
  }

  const offset = dayParam === "yesterday" ? -1 : 1;
  const matchesData = await fetchFixtures(offset);

  const targetDate = new Date();
  targetDate.setUTCDate(targetDate.getUTCDate() + offset);

  return (
    <div className="py-5">
      <div className="max-w-4xl mx-auto px-3 md:px-4">
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100 rounded-xl"></div>}>
          <HomeDashboard 
            initialMatchesData={matchesData} 
            targetDate={targetDate} 
            dayParam={dayParam as "yesterday" | "tomorrow"} 
          />
        </Suspense>
      </div>
    </div>
  );
}
