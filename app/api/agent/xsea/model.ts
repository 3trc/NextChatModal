import { ChatOllama } from "@langchain/ollama";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENAI_API_KEY,
});

const openrouterModel = openrouter("qwen/qwen-2-72b-instruct");

export const openrouterGenerate = async (
  prompts: {
    role: "system" | "assistant" | "user" | "tools";
    content: string;
  }[],
) => {
  return await openrouterModel.doGenerate({
    mode: { type: "regular" },
    inputFormat: "prompt",
    prompt: prompts as any[],
  });
};

const model = new ChatOllama({
  baseUrl: "http://111.9.7.102:31131",
  model: "perfma-gpt-json-14b:latest",
  numCtx: 16384,
  keepAlive: "10000h",
  streaming: true,
  stop: ["<|im_start|>", "<|im_end|>", "<|im_sep|>"],
  topK: 1,
  topP: 0.5,
  temperature: 0.1,
  penalizeNewline: true,
  seed: 2025,
});

export default model;
