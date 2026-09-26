"use client";
import React, { useState } from "react";
import ChatArea from "./ChatArea";
import { ChatInput } from "./ChatInput";
import { Sparkle } from "lucide-react";
import { BotChatMessage } from "./typescript/types";
import { BotUserMessage } from "./typescript/interfaces";

const ChatBox = () => {
  const [messages, setMessages] = useState<BotChatMessage[]>([]);
  const [aiFetchLoading, setAiFetchLoading] = useState(false);

  const pushMessage = async (newMessage: BotUserMessage) => {
    setMessages((oldMessages) => [...oldMessages, newMessage]);

    if (aiFetchLoading) {
      return;
    }
    setAiFetchLoading(true);

    try {
      const res = await fetch(
        `api/v1/regulator_assessments?query=${newMessage.text}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        },
      );

      const data = await res.json();
      console.log("data:", data);
      if (data.status == "ok") {
        const aiResponse: BotChatMessage = data?.result;

        setMessages((oldMessages) => [...oldMessages, aiResponse]);
      } else {
        setMessages((oldMssages) => {
          return [
            ...oldMssages,
            {
              id: crypto.randomUUID().toString(),
              text: "Unable to process your request. Please try later.",
              label: "error",
            },
          ];
        });
      }
    } catch (err) {
      alert("Somthing wrong please try later.");
    } finally {
      setAiFetchLoading(false);
    }
  };

  const handleChipClick = (text: string) => {
    pushMessage({
      id: crypto.randomUUID().toString(),
      text,
      created_by: "user",
    } as BotUserMessage);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl overflow-hidden mt-4 mb-4  mx-auto">
      {/* Chat Area */}
      <div className="flex-1 overflow-hidden relative">
        <ChatArea
          messages={messages}
          isLoading={aiFetchLoading}
          onChipClick={handleChipClick}
        />
      </div>

      {/* Chat Input */}
      <div className="shrink-0 bg-white">
        <ChatInput pushMessage={pushMessage} aiFetchLoading={aiFetchLoading} />
      </div>
    </div>
  );
};

export default ChatBox;
