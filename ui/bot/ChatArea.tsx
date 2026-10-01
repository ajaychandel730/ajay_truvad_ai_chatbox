"use client";
import React, { useState, useEffect, useRef } from "react";
import { AIResponseCard } from "./AIResponseCard";
import { UserMessage } from "./UserMessage";
import { BotChatMessage } from "./typescript/types";
import AiErrorMessage from "./AiErrorMessage";
import { Skeleton, Spinner } from "@heroui/react";
import { AILoadingIndicator } from "./AILoadingIndicator";
import { Sparkles } from "lucide-react";
import ChatEmptyState from "./ChatEmptyState";
import AiRAGCard from "./AiRAGCard";

type Props = {
  messages: BotChatMessage[];
  isLoading: boolean;
  onChipClick: (text: string) => void;
};

const ChatArea = ({ messages, isLoading, onChipClick }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <div className="max-w-4xl h-full w-full overflow-y-auto p-8 flex flex-col gap-8 pb-32 scrollbar-thin relative bg-slate-50/30">
      {messages?.length === 0 && (
       <ChatEmptyState onChipClick={onChipClick}/>
      )}

      {messages?.map((message) => {
        if ("label" in message && message.label == "error") {
          return <AiErrorMessage key={message.id} message={message} />;
        } else if ("created_by" in message && message.created_by == "user") {
          return <UserMessage key={message.id} content={message.text} />;
        } else if ("created_by" in message) {
          return (
            <AiRAGCard
              key={message.id}
              text={message.text}
            />
          );
        }
      })}

      {isLoading && <AILoadingIndicator />}
      <div ref={bottomRef} aria-hidden="true" />
    </div>
  );
};

export default ChatArea;
