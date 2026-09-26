"use client";

import React from "react";
import { Dot, Sparkle } from "lucide-react";
import { Skeleton } from "@heroui/react/skeleton";

export function AILoadingIndicator() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col w-fit">
        <style>{`
        @keyframes starScale {
          0%, 100% { transform: scale(0.5); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .animate-star-1 { animation: starScale 1.5s infinite ease-in-out; }
        .animate-star-2 { animation: starScale 1.5s infinite ease-in-out 0.5s; }
        .animate-star-3 { animation: starScale 1.5s infinite ease-in-out 1s; }
      `}</style>

        {/* Define the gradient for Lucide icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient
              id="ai-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#a855f7" /> {/* purple-500 */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
            </linearGradient>
          </defs>
        </svg>

        <div className="flex items-center gap-3">
          {/* 3 Stars Cluster using lucide-react */}
          <div className="relative w-10 h-10">
            <Sparkle
              fill="url(#ai-gradient)"
              stroke="none"
              className="absolute left-0 bottom-2 w-4 h-4 animate-star-1 drop-shadow-sm"
            />
            <Sparkle
              fill="url(#ai-gradient)"
              stroke="none"
              className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-6 animate-star-2 drop-shadow-md"
            />
            <Sparkle
              fill="url(#ai-gradient)"
              stroke="none"
              className="absolute right-0 top-3 w-3.5 h-3.5 animate-star-3 drop-shadow-sm"
            />
          </div>

          {/* Gradient Text */}
          <span className="flex text-[15px] font-semibold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse tracking-wide">
            Thinking
          </span>
        </div>
      </div>

      <div className="space-y-3 w-[40%] ">
        <Skeleton className="h-2 w-3/5 rounded-lg bg-gray-300" />
        <Skeleton className="h-2 w-4/5 rounded-lg bg-gray-300" />
        <Skeleton className="h-2 w-2/5 rounded-lg bg-gray-300" />
      </div>
    </div>
  );
}
