import type { Metadata } from "next";
import { Sidebar } from "@/ui/bot/Sidebar";
import { BotHeader } from "@/ui/bot/BotHeader";

export const metadata: Metadata = {
  title: "Regulatory Copilot - Truvad",
  description: "Evidence-based regulatory analysis",
};

export default function BotLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex flex-col h-dvh overflow-hidden bg-gray-50">
        <BotHeader />
        {children}
      </div>
  );
}
