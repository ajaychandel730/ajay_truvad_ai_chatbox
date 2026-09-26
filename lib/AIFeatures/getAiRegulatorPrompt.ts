"use server";
import fs from "fs/promises";
import Path from "path";


export const getAiRegulatorPrompt = async (query: string):Promise<string> => {
  const filePath = Path.join(
    process.cwd(),
    "lib",
    "AIFeatures",
    "prompts",
    "regulator_prompt.txt",
  );
  
  const file = await fs.readFile(filePath, "utf-8");
  const text = file.replace("{{QUERY}}", query);
  return text;
};
