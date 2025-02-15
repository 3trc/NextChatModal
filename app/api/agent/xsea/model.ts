import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  baseUrl: "http://183.220.36.102:31811",
  model: "perfma-gpt-14b:latest",
  numCtx: 16384,
  keepAlive: "10000h",
  streaming: true,
  stop: ["<|im_start|>", "<|im_end|>", "<|im_sep|>"],
  topK: 6,
  topP: 0.6,
  temperature: 0.06,
  penalizeNewline: true,
});

export default model;
