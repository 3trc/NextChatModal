import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  baseUrl: process.env.BASE_URL_2,
  model: "phi4:14b",
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
