import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export default async function () {
  return new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite",
    temperature: 0,
    thinkingConfig:{
        thinkingLevel:"LOW"
    }
  });
}


