import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({
  baseUrl: "http://183.220.36.102:32141",
  model: "phi4:latest",
  numCtx: 16384,
  keepAlive: "10000h",
});

export default model;
