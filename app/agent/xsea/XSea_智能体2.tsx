import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent from "..";
import { AgentStore } from "../store";

class _Agent extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🤖",
        name: "XSea智能体2",
        context: [
          {
            id: "",
            role: "system",
            content: `
XSea是一个性能测试平台，你是XSea的AI助手
            `.trim(),
            date: "",
          },
        ],
        modelConfig: {
          model: "qwen/qwen-2-72b-instruct",
          max_tokens: 16384,
          topK: 1,
          top_p: 0.5,
          temperature: 0.1,
        },
      },
      chatStore,
      navigate,
    );
  }
}

export default () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  useEffect(() => {
    const agent = new _Agent(chatStore, navigate);
    AgentStore.register(agent.Name, agent);
  }, [chatStore, navigate]);
  return <></>;
};
