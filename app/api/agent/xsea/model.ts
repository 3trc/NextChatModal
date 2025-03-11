import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  baseUrl: "http://183.220.36.102:31311",
  model: "qwen/qwen-2-72b-instruct",
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
