"use client";
import React, { useState } from "react";
import { AIResponseCard } from "./AIResponseCard";
import { UserMessage } from "./UserMessage";
import { BotChatMessage } from "./typescript/types";
import AiErrorMessage from "./AiErrorMessage";

type Props = {
  messages: BotChatMessage[];
  isLoading: boolean;
};

const ChatArea = ({ messages, isLoading }: Props) => {
  return (
    <div className="max-w-4xl w-full overflow-y-auto p-8 flex flex-col gap-8 pb-32">
      {messages?.map((message) => {
        if ("label" in message && message.label == "error") {
          return <AiErrorMessage message={message} />;
        } else if ("created_by" in message && message.created_by == "user") {
          return <UserMessage key={message.id} content={message.text} />;
        } else if ("created_by" in message) {
          return (
            <AIResponseCard
              key={message.id}
              summary={message.summary}
              changes={message.changes}
              effectiveDate={message.effective_date}
              status={message.status}
              impactedTeams={message.impacted_teams}
              actions={message.actions}
              citations={message.citations}
            />
          );
        }
      })}
      {isLoading && (
        <div className="w-4 h-4 rounded-full bg-sky-400 animate-pulse"></div>
      )}

      {/* <UserMessage content="RBI ke latest digital lending changes NBFC pe kya impact karenge?" />

      <AIResponseCard
        summary="The latest RBI digital lending requirements may require NBFCs to review their digital lending processes, disclosures, and arrangements with lending service providers."
        changes={[
          "Updated borrower disclosure requirements",
          "Additional requirements for digital lending partners",
        ]}
        effectiveDate="01 Apr 2025"
        status="effective"
        impactedTeams={["Compliance", "Legal", "Product"]}
        actions={[
          "Review the current digital lending workflow",
          "Verify borrower disclosures",
          "Review agreements with digital lending partners",
        ]}
        citations={[
          {
            title: "RBI Digital Lending Guidelines",
            url: "#",
          },
        ]}
      /> */}
    </div>
  );
};

export default ChatArea;
