"use client";
import { Tooltip, Button } from "@heroui/react";
import { Sparkles } from "lucide-react";
import React from "react";
import Link from "next/link";
const BotButton = () => {
  return (
    <Tooltip delay={0}>
      <Link href={"/bot"}>
        <Button isIconOnly>
          <Sparkles className="w-5 h-5" />
        </Button>
      </Link>
      <Tooltip.Content>
        <p>This is a AI chatbox</p>
      </Tooltip.Content>
    </Tooltip>
  );
};

export default BotButton;
