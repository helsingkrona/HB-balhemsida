"use client";

import { useEffect, useState } from "react";

// Balen: lördag 3 oktober 2026, dörrarna öppnar 16:30 (CEST, +02:00)
const TARGET = new Date("2026-10-03T16:30:00+02:00").getTime();

function calc() {
  const diff = TARGET - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    past: diff <= 0,
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

const Countdown: React.FC = () => {
  // Beräknas bara på klienten för att undvika hydration-mismatch
  const [t, setT] = useState<ReturnType<typeof calc> | null>(null);

  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (t?.past) {
    return <p className="font-serif text-2xl text-gold">Vi ses på balen!</p>;
  }

  const units = [
    { label: "Dagar", value: t?.days },
    { label: "Timmar", value: t?.hours },
    { label: "Minuter", value: t?.minutes },
    { label: "Sekunder", value: t?.seconds },
  ];

  return (
    <div className="flex items-start justify-center gap-5 sm:gap-9" suppressHydrationWarning>
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="font-serif text-4xl font-semibold tabular-nums text-parchment sm:text-5xl">
            {u.value === undefined ? "–" : String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold sm:text-xs">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
