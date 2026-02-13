"use client";

import { useEffect, useState } from "react";

export default function Countdown({ active }: { active: boolean }) {
  const [seconds, setSeconds] = useState(15 * 60 - 1);

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [active]);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const display = `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="text-center py-6 my-6 bg-gradient-to-b from-red-50 to-white rounded-2xl border border-red-100">
      <p className="text-sm font-medium text-gray-500 mb-1">Faltam</p>
      <div className="text-4xl font-black text-red-600 tracking-tight tabular-nums">
        {display}
      </div>
      <p className="text-sm font-medium text-gray-500 mt-1">
        para o acesso expirar!
      </p>
    </div>
  );
}
