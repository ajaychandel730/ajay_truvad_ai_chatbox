import type { Metadata } from "next";
import { Sidebar } from "@/ui/bot/Sidebar";
import { BotHeader } from "@/ui/bot/BotHeader";

export const metadata: Metadata = {
  title: "Regulatory Copilot - Truvad",
  description: "Evidence-based regulatory analysis",
};

export default function BotLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900">
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white rounded-tl-2xl shadow-xl z-10 border-l border-slate-200">
      <BotHeader />
        {children}
      </div>
    </div>
  );
}
