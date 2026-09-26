import { Chip } from "@heroui/react";
import { Circle, Sparkle } from "lucide-react";

export function BotHeader() {
  return (
      <header className="flex items-center gap-2.5 px-6 py-4 h-20 bg-[#163C62] text-white shrink-0">
        <Sparkle className="w-5 h-5 fill-current" />
        <span className="font-semibold tracking-wide text-[16px]">
          GRIP AI Copilot
        </span>
      </header>
  );
}
