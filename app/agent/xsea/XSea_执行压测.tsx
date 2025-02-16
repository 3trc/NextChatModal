import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";
import LocalJSON from "@/app/components/xsea/localJSON";

export class Agent_XSea_执行压测 extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_执行压测",
        context: [
          {
            id: "",
            role: "system",
            content: `
确保中文回答，确保回答"开始"，避免回答非"开始"文本，避免回答超过两个汉字，避免回答英文
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
    if (LocalJSON.selected_scripts?.length > 0) {
    } else {
      return {
        agentName: "XSea_查询脚本",
        bridgeMessages: [
          {
            role: "assistant",
            content:
              "🤔 看起来你还没有选择任何脚本，这样不能开始压测哦，我们去选择一些脚本吧！",
          },
        ],
      };
    }
  }
}

const XSea_执行压测 = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  const agent = new Agent_XSea_执行压测(chatStore, navigate);
  useEffect(() => {
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_执行压测;
