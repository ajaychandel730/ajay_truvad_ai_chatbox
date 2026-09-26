import { BotHeader } from "@/ui/bot/BotHeader";
import { UserMessage } from "@/ui/bot/UserMessage";
import { AIResponseCard } from "@/ui/bot/AIResponseCard";
import { ChatInput } from "@/ui/bot/ChatInput";
import ChatArea from "@/ui/bot/ChatArea";
import ChatBox from "@/ui/bot/ChatBox";

export default function BotPage() {
  return (
    <div className="flex flex-col items-center h-full  relative overflow-y-auto">
       <ChatBox/>
    </div>
  );
}
