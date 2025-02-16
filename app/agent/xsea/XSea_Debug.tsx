import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent from "..";
import { AgentStore } from "../store";

export class Agent_XSea_Debug extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_Debug",
        context: [
          {
            id: "",
            role: "system",
            content: `
确保中文回答，确保回答"你好"，避免回答非"你好"文本，避免回答超过两个汉字，避免回答英文
          `.trim(),
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

const XSea_Debug = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  const agent = new Agent_XSea_Debug(chatStore, navigate);
  useEffect(() => {
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_Debug;
