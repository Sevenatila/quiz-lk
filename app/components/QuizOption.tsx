"use client";

import { useState } from "react";

export default function QuizOption({
  text,
  selected,
  onClick,
  index,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={() => {
        setPressed(true);
        onClick();
        setTimeout(() => setPressed(false), 300);
      }}
      style={{ animationDelay: `${index * 80}ms` }}
      className={`
        animate-fadeInUp w-full flex items-center gap-4 p-4 rounded-2xl border-2
        transition-all duration-200 text-left cursor-pointer group
        ${
          selected
            ? "border-red-500 bg-red-50 shadow-md shadow-red-100"
            : "border-gray-150 bg-white hover:border-red-200 hover:bg-red-50/30 hover:shadow-sm"
        }
        ${pressed ? "scale-[0.97]" : "scale-100"}
      `}
    >
      <span
        className={`
          w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center
          transition-all duration-200
          ${
            selected
              ? "border-red-500 bg-red-500"
              : "border-gray-300 group-hover:border-red-300"
          }
        `}
      >
        {selected && (
          <span className="w-2 h-2 bg-white rounded-full animate-scaleIn" />
        )}
      </span>
      <span
        className={`text-base font-medium leading-snug transition-colors ${
          selected ? "text-red-900" : "text-gray-700"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
