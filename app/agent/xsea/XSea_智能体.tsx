import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";

export class Agent_XSea_智能体 extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_智能体",
        context: [
          {
            id: "",
            role: "system",
            content: `
确保中文回答，确保回答"智能体"，避免回答非"智能体"文本，避免回答超过两个汉字，避免回答英文
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

  public onBeforeActive(): MaybeAgentSwitcher {
    // return {
    //   agentName: "XSea_Debug",
    //   bridgeMessages: [],
    // };
  }
}

const XSea_智能体 = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  const agent = new Agent_XSea_智能体(chatStore, navigate);
  useEffect(() => {
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_智能体;
