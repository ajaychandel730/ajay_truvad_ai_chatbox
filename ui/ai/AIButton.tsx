"use client";
import { Button, Drawer, Tooltip } from "@heroui/react";
import { Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import AIChatInput from "./AIChatInput";
import { AIChatMessage } from "./type";
import UserMessage from "./UserMessage";
import AIMessage from "./AIMessage";

const AIButton = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [aiFetchLoading, setAiFetchLoading] = useState(false);

  const pushMessage = async (newMessage: AIChatMessage) => {
    if (newMessage.created_by != "user") return;

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
        const aiResponse: AIChatMessage = data?.result;
        setMessages((oldMessages) => [...oldMessages, aiResponse]);
      } else {
        alert(data?.message || "Somthing went wrong");
      }
    } catch (err) {
      alert("Somthing wrong please try later.");
    }
  };

  return (
    <Drawer>
      <Tooltip delay={0}>
        <Button isIconOnly>
          <Sparkles className="w-5 h-5" />
        </Button>
        <Tooltip.Content>
          <p>This is a AI chatbox</p>
        </Tooltip.Content>
      </Tooltip>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger /> {/* Optional: Close button */}
            <Drawer.Header>
              <Drawer.Heading>New chat</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body
              aria-live="polite"
              className="text-gray-900 flex flex-col space-y-4"
            >
              {messages.map((message) => {
                if (message.created_by == "user") {
                  return <UserMessage key={message.id} message={message} />;
                } else if (message.created_by == "ai") {
                  <AIMessage key={message.id} message={message} />;
                } else {
                  return null;
                }
              })}
              {aiFetchLoading && (
                <div className="w-4 h-4 rounded-full bg-sky-400 animate-pulse"></div>
              )}
            </Drawer.Body>
            <Drawer.Footer>
              <AIChatInput
                pushMessage={pushMessage}
                aiFetchLoading={aiFetchLoading}
              />
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
};

export default AIButton;
