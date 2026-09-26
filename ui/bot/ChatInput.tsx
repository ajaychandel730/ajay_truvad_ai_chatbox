"use client";
import { Input, Button } from "@heroui/react";
import { ArrowUp } from "lucide-react";
import { BotUserMessage } from "./typescript/interfaces";

type Props = {
  pushMessage: (newMessage: BotUserMessage) => Promise<void>;
  aiFetchLoading: boolean;
};

export function ChatInput({ pushMessage, aiFetchLoading }: Props) {
   
  
  const onSubmithandler = (
    //@ts-ignore
    event: React.MouseEvent<FocusableElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget.form);
    const message = form.get("query");
    console.log("message:", message);
    if (!message) return;

    pushMessage({
      id: crypto.randomUUID(),
      created_by: "user",
      text: message.toString(),
      created_at: Date.now().toString(),
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-white via-white to-transparent">
      <form className="max-w-4xl mx-auto relative flex items-center">
        <Input
          name="query"
          type="text"
          placeholder="Ask about a regulation, regulator, jurisdiction, or business impact..."
          className="w-full bg-white shadow-sm outline-solid outline outline-gray-400 focus:outline-hidden  focus-within:ring-2! focus-within:ring-blue-500/60! pr-14 py-6 text-[15px] placeholder:text-slate-600"
        />
        <Button
          type="submit"
          onClick={onSubmithandler}
          isDisabled={aiFetchLoading}
          isIconOnly
          className="absolute right-2 z-10 bg-blue-600 hover:bg-blue-700 h-10 w-10 min-w-10"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
