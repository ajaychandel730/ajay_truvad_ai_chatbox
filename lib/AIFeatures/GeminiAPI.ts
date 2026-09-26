import { GoogleGenAI } from "@google/genai";

interface ResponseFormat{
  type:string;
  mime_type?:string;
  schema?:object;
}

const ai = new GoogleGenAI({ apiKey: process.env.GIMINI_AI_API_KEY });

export async function googleGeminiAi(text: string, response_format:ResponseFormat) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.1-flash-lite",
    input: text,
    response_format
  });
  
  return interaction;
}