import { Button, TextArea } from "@heroui/react";
import { ArrowUp } from "lucide-react";
import React from "react";
import { AIChatMessage } from "./type";


type Props = {
  pushMessage: (newMessage: AIChatMessage) => void;
  aiFetchLoading: boolean;
};

const AIChatInput = ({ pushMessage, aiFetchLoading }: Props) => {
  
  const onSubmithandler = (
    //@ts-ignore
    event: React.MouseEvent<FocusableElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget.form);
    const message = form.get("message");
    if (!message) return;

    pushMessage({
      id: crypto.randomUUID(),
      created_by: "user",
      text: message.toString(),
      created_at:Date.now().toString()
    });
  };

  return (
    <form className="flex items-center justify-between p-2 w-full rounded-md gap-2 border border-gray-300">
      <textarea
        name="message"
        aria-label="Ask anything to ai."
        placeholder="Ask anything...."
        className={
          "resize-none focus:outline-0 placeholder:text-gray-500 h-full  overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden  shadow-none border-0 flex flex-1"
        }
      />
      <Button
        isDisabled={aiFetchLoading}
        type="submit"
        onClick={onSubmithandler}
        isIconOnly
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default AIChatInput;
