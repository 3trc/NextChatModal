import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent from "..";
import { AgentStore } from "../store";

class _Agent extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_执行压测",
        context: [
          {
            id: "",
            role: "system",
            content: ``.trim(),
            date: "",
          },
        ],
        modelConfig: {
          model: "perfma-gpt-14b:latest",
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
