"use client";
import {
  Settings,
  LayoutDashboard,
  Bot,
  Activity,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

export function Sidebar() {
  return (
    <div className="w-64 bg-[#0B1120] text-slate-300 flex flex-col justify-between shrink-0 h-full">
      <div>
        {/* Logo Placeholder */}
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 bg-blue-600 rounded-md"></div>
          <div className="h-6 w-32 bg-white rounded-sm"></div>
        </div>

        <div className="px-6 py-2 text-xs font-semibold tracking-wider text-slate-500 mb-2">
          SENTINEL
        </div>

        <nav className="space-y-1 px-3">
          <Button
            // as={Link}
            // href="#"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
            // startContent={<LayoutDashboard className="h-4 w-4 text-slate-400" />}
          >
            Overview
          </Button>

          <Button
            // as={Link}
            // href="/bot"
            // variant="flat"
            className="w-full justify-start bg-slate-800 text-white shadow-sm"
            // startContent={<Bot className="h-4 w-4 text-blue-400" />}
          >
            Regulatory Copilot
          </Button>

          <Button
            // as={Link}
            // href="#"
            // variant="light"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
            // startContent={<Activity className="h-4 w-4 text-slate-400" />}
          >
            Regulatory Intelligence
          </Button>

          <Button
            // as={Link}
            // href="#"
            // variant="light"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
            // startContent={<ShieldCheck className="h-4 w-4 text-slate-400" />}
          >
            Compliance
          </Button>
        </nav>
      </div>

      <div className="p-6">
        <Button
          // as={Link}
          // href="#"
          // variant="light"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800 mb-4"
          // startContent={<Settings className="h-4 w-4 text-slate-400" />}
        >
          Settings
        </Button>
        <div className="px-3 text-xs text-slate-500 flex flex-col gap-1">
          <span>Private workspace</span>
          <span>Human review required</span>
        </div>
      </div>
    </div>
  );
}
