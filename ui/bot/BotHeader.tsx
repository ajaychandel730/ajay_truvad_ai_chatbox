import { Chip } from "@heroui/react";
import { Circle } from "lucide-react";

export function BotHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-slate-300 shrink-0">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          Regulatory Copilot
        </h1>
        <p className="text-sm text-slate-500">
          Evidence-based regulatory analysis
        </p>
      </div>
      <Chip
        color="success"
        className="bg-emerald-50 border-emerald-100 border text-emerald-700 font-medium text-xs flex items-center"
      >
        <Circle className="h-2 w-2 fill-emerald-600 text-emerald-600 mr-1" />
        Sources ready
      </Chip>
    </header>
  );
}
