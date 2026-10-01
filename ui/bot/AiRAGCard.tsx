import { Card, Chip, Separator } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Citation {
  title: string;
  url: string;
}

interface Props {
  text:string
}

export default function AiRAGCard({
  text
}: Props) {
  // Helper to format status for display
  const formatStatus = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <Card
      variant="default"
      className="flex flex-col  mx-auto w-full border border-slate-200 rounded-2xl shadow-sm"
    >
    
      <Card.Content className="p-0">
        <p className="text-[15px] text-slate-700 leading-relaxed mb-4">
          {text}
        </p>
      </Card.Content>
    </Card>
  );
}
