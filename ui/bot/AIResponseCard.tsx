import { Card, Chip, Separator } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Citation {
  title: string;
  url: string;
}

interface AIResponseProps {
  summary: string;
  changes: string[];
  effectiveDate: string | null;
  status: "effective" | "upcoming" | "expired" | "unknown";
  impactedTeams: string[];
  actions: string[];
  citations: Citation[];
}

export function AIResponseCard({
  summary,
  changes,
  effectiveDate,
  status,
  impactedTeams,
  actions,
  citations,
}: AIResponseProps) {
  // Helper to format status for display
  const formatStatus = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <Card
      variant="default"
      className="flex flex-col  mx-auto w-full border border-slate-200 rounded-2xl shadow-sm"
    >
      <Card.Header className="flex items-center gap-3 px-6 pt-6 pb-2">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          AI Analysis
        </h2>
        <Chip
          size="sm"
          className="bg-amber-100 text-amber-800 rounded font-medium"
        >
          Human review
        </Chip>
      </Card.Header>

      <Card.Content className="px-6 pb-6 pt-0">
        <p className="text-[15px] text-slate-700 leading-relaxed mb-4">
          {summary}
        </p>

        {/* Regulatory Changes Card */}
        {changes.length > 0 && (
          <Card
            variant="transparent"
            className="border  border-slate-200 bg-slate-50/50"
          >
            <Card.Content className=" md:p-5 flex flex-col items-start">
              <h3 className="text-sm font-semibold text-slate-600 mb-3">
                Regulatory changes
              </h3>
              <ul className="text-[14px] text-slate-700 space-y-2 pl-4 list-disc list-outside marker:text-slate-400">
                {changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </Card.Content>
          </Card>
        )}

        {/* Cards Grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          {/* Impacted Teams Card */}
          {impactedTeams.length > 0 && (
            <Card
              variant="transparent"
              className="border  border-slate-200 bg-slate-50/50"
            >
              <Card.Content className="md:p-5 flex flex-col items-start">
                <h3 className="text-sm font-semibold text-slate-600 mb-2">
                  Impacted teams
                </h3>
                <ul className="text-[14px] text-slate-700 space-y-1 list-disc list-inside marker:text-slate-400">
                  {impactedTeams.map((team, i) => (
                    <li key={i}>{team}</li>
                  ))}
                </ul>
              </Card.Content>
            </Card>
          )}

          {/* Effective Date Card */}
          {effectiveDate !== "null" && (
            <Card
              variant="transparent"
              className="border border-slate-200 bg-slate-50/50"
            >
              <Card.Content className="md:p-5">
                <h3 className="text-sm mb-2 font-semibold text-slate-600">
                  Effective date
                </h3>
                <div className="text-[14px] text-slate-700">
                  <p className="font-medium mb-1">
                    {effectiveDate || "Not specified"}
                  </p>
                  <p className="text-slate-600">
                    Status: {formatStatus(status)}
                  </p>
                </div>
              </Card.Content>
            </Card>
          )}
        </div>

        {/* Recommended Actions */}
        <div className="mt-2 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Recommended actions
          </h3>
          <ul className="text-[14px] text-slate-700 space-y-2 pl-4 list-disc  marker:text-slate-400">
            {actions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ul>
        </div>

        <Separator className="bg-slate-100" />

        {/* Sources */}
        {citations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Sources
            </h3>
            <div className="flex flex-col gap-2">
              {citations.map((citation, i) => (
                <Link
                  key={i}
                  href={citation.url}
                  target="_blank"
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-sm font-medium w-fit transition-colors"
                >
                  [{i + 1}] {citation.title}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
