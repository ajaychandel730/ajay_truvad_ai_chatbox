import React from "react";
import { AIChatMessage } from "./type";

const AIMessage = ({ message }: { message: AIChatMessage }) => {
  if (message.created_by !== "ai") {
    return <></>;
  }

  return (
    <div className="flex w-full justify-start">
      <div className="w-full max-w-2xl rounded-2xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            AI
          </div>

          <div>
            <p className="font-semibold">Regulatory Assistant</p>
            <p className="text-xs text-gray-500">
              {new Date(message.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Main information */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoItem label="Jurisdiction" value={message.jurisdiction} />

          <InfoItem label="Regulator" value={message.regulator} />

          <InfoItem label="Risk Level" value={message.risk_level} />

          <InfoItem label="Status" value={message.status} />

          <InfoItem label="Effective Date" value={message.effective_date} />

          <InfoItem
            label="Grace Period Deadline"
            value={message.grace_period_deadline}
          />
        </div>

        {/* Timeline */}
        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold">Timeline</h3>

          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {message.timeline_notes}
          </p>
        </div>

        {/* Citations */}
        <div className="mt-5 border-t pt-4 dark:border-gray-700">
          <h3 className="mb-2 text-sm font-semibold">Sources</h3>

          <p className="break-word text-sm leading-6 text-gray-600 dark:text-gray-300">
            {message.citations}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIMessage;

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
      <p className="text-xs font-medium text-gray-500">{label}</p>

      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
