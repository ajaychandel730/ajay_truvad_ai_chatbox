import { BotUserMessage, BotAiMessage, BotErrorMessage } from "./interfaces";

export type BotChatMessage = BotUserMessage | BotAiMessage | BotErrorMessage;
