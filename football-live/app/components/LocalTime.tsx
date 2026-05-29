'use client';

import React, { useEffect, useState } from 'react';

interface LocalTimeProps {
  serverTime: string;
  timestamp?: number;
}

export default function LocalTime({ serverTime, timestamp }: LocalTimeProps) {
  const [localTime, setLocalTime] = useState(serverTime);

  useEffect(() => {
    if (timestamp) {
      const date = new Date(timestamp);
      // Format to HH:MM based on user's browser locale and timezone
      const timeString = date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setLocalTime(timeString);
    }
  }, [timestamp]);

  return (
    <span suppressHydrationWarning>
      {localTime}
    </span>
  );
}
