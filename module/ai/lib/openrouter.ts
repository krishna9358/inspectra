import { createOpenAI } from "@ai-sdk/openai";

const openrouterProvider = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000", // required by OpenRouter
    "X-Title": "inspectra", // optional but recommended
  },
});

export const openrouter = (model: string) => openrouterProvider(model);
