"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export const generateQuizTitle = async (prompt: string) => {
  const result = await generateObject({
    model: google("gemini-1.5-pro-latest"),
    schema: z.object({
      title: z.string().describe(
        // "A max three word title for the quiz based on the file provided as context",
        "A max three word title for the quiz based on the prompt provided as context",
      ),
    }),
    prompt:
      // "Generate a title for a quiz based on the following (PDF) file name. Try and extract as much info from the file name as possible. If the file name is just numbers or incoherent, just return quiz.\n\n " +
      // file,
      "Generate a title for a quiz based on the following prompt. Try and extract as much info from the keywords n the prompt as possible.\n\n " +
      prompt,
  });
  return result.object.title;
};
