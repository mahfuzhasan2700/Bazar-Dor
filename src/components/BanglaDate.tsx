"use client";

import { useSyncExternalStore } from "react";
import { getTodayBanglaDate } from "@/lib/utils";

interface BanglaDateProps {
  className?: string;
}

function subscribe(onStoreChange: () => void) {
  // Check periodically (every 30 seconds) so the date automatically flips at midnight
  const interval = setInterval(onStoreChange, 30000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return getTodayBanglaDate();
}

function getServerSnapshot() {
  return getTodayBanglaDate();
}

/**
 * Client component that displays the current Bangla date and automatically
 * updates dynamically when the day changes (e.g. across midnight), preventing
 * stale build-time dates from SSG/ISR caches.
 */
export default function BanglaDate({ className }: BanglaDateProps) {
  const date = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className={className} suppressHydrationWarning>
      {date}
    </span>
  );
}
