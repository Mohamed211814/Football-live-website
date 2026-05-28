"use client";

import { useSearchParams } from "next/navigation";
import { League } from "../types";
import DateBar from "./DateBar";
import DayTabs from "./DayTabs";
import MatchList from "./MatchList";
import HomeStats from "./HomeStats";
import { useMemo, useState, useEffect } from "react";

interface HomeDashboardProps {
  initialMatchesData: League[];
  targetDate: Date;
  dayParam: "yesterday" | "today" | "tomorrow";
}

export default function HomeDashboard({ initialMatchesData, targetDate, dayParam }: HomeDashboardProps) {
  const searchParams = useSearchParams();
  const leagueParam = searchParams.get('league');
  const sortParam = searchParams.get('sort');

  const [liveMatchesData, setLiveMatchesData] = useState<League[]>(initialMatchesData);

  // Sync state when initial data changes (e.g., navigating days)
  useEffect(() => {
    setLiveMatchesData(initialMatchesData);
  }, [initialMatchesData]);

  // Smart Polling for live matches
  useEffect(() => {
    // Only aggressive poll for "today"
    if (dayParam !== "today") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/fixtures');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveMatchesData(json.data);
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [dayParam]);

  const matchesData = useMemo(() => {
    let data = [...liveMatchesData];

    // 1. Filter by league if selected
    if (leagueParam) {
      data = data.filter(league => String(league.id) === leagueParam);
    }

    // 2. Sort if live matches only
    if (sortParam === "live") {
      // Sort leagues: leagues with live matches first
      data.sort((a, b) => {
        const aLive = a.matches.some((m) => m.status === "live") ? 1 : 0;
        const bLive = b.matches.some((m) => m.status === "live") ? 1 : 0;
        return bLive - aLive;
      });

      // Sort matches within leagues: live matches first
      data = data.map((league) => {
        const sortedMatches = [...league.matches].sort((a, b) => {
          const aLive = a.status === "live" ? 1 : 0;
          const bLive = b.status === "live" ? 1 : 0;
          return bLive - aLive;
        });
        return { ...league, matches: sortedMatches };
      });
    }

    return data;
  }, [liveMatchesData, leagueParam, sortParam]);

  // Calculate stats based on the FILTERED data
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
    <>
      <HomeStats 
        totalMatches={totalMatches} 
        liveMatches={liveMatches} 
        finishedMatches={finishedMatches} 
      />

      <DayTabs activeTab={dayParam} />

      <DateBar date={targetDate} dayParam={dayParam} />

      <MatchList leagues={matchesData} />
    </>
  );
}
