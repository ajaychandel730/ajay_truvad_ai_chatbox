import React from "react";
import AIButton from "./ai/AIButton";
import BotButton from "./bot/BotButton";

const HeaderSection = () => {
  return (
    <header className="flex w-full items-center h-20 border-b border-gray-300  p-10">
      <BotButton/>
    </header>
  );
};

export default HeaderSection;
