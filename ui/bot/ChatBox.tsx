"use client";
import React, { useState } from "react";
import ChatArea from "./ChatArea";
import { ChatInput } from "./ChatInput";
import { Sparkle } from "lucide-react";
import { BotChatMessage } from "./typescript/types";
import { BotUserMessage } from "./typescript/interfaces";
import { uuid } from "zod";

const ChatBox = () => {
  const [messages, setMessages] = useState<BotChatMessage[]>([]);
  const [aiFetchLoading, setAiFetchLoading] = useState(false);
  const [aiUiLoading, setaiUiloading] = useState(false);

  const pushMessage = async (newMessage: BotUserMessage) => {
    setMessages((oldMessages) => [...oldMessages, newMessage]);

    if (aiFetchLoading) {
      return;
    }

    setAiFetchLoading(true);
    setaiUiloading(true);

    try {
      const res = await fetch(
        `api/v3/chatbot/retrival?query=${newMessage.text}`,
        {
          method: "GET",
        },
      );

      if (!res.ok || !res.body) {
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
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, {
          stream: true,
        });

        answer += chunk;
        console.log(answer);

        setMessages((oldMessages) => {
          const lastMessage = oldMessages[oldMessages.length - 1];
          if ("created_by" in lastMessage && lastMessage.created_by != "ai") {
            return [
              ...oldMessages,
              { id: crypto.randomUUID(), created_by: "ai", text: answer },
            ];
          } else if (
            "created_by" in lastMessage &&
            lastMessage.created_by == "ai"
          ) {
            console.log("lastMessage:", lastMessage);
            lastMessage.text = answer;
            return [...oldMessages];
          } else {
            return oldMessages;
          }
        });
      }

      // if (data.status == "ok") {
      //   const aiResponse: BotChatMessage = data?.result;

      //   setMessages((oldMessages) => [...oldMessages, aiResponse]);
      // } else {
      //   setMessages((oldMssages) => {
      //     return [
      //       ...oldMssages,
      //       {
      //         id: crypto.randomUUID().toString(),
      //         text: "Unable to process your request. Please try later.",
      //         label: "error",
      //       },
      //     ];
      //   });
      // }
    } catch (err) {
      alert("Somthing wrong please try later.");
    } finally {
      setAiFetchLoading(false);
      setaiUiloading(false);
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
          isLoading={aiUiLoading}
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
