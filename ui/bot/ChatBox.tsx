"use client";
import React, { useState } from "react";
import ChatArea from "./ChatArea";
import { ChatInput } from "./ChatInput";
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

      if (data?.status == "ok") {
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

  return (
    <>
      <ChatArea messages={messages} isLoading={aiFetchLoading} />
      <ChatInput pushMessage={pushMessage} aiFetchLoading={aiFetchLoading} />
    </>
  );
};

export default ChatBox;
