import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { ChatMessageX, MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";
import LocalJSON from "@/app/components/xsea/localJSON";

export class Agent_XSea_查询脚本 extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_查询脚本",
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

  public onBeforeActive(): MaybeAgentSwitcher {
    if (LocalJSON.selected_product) {
    } else {
      return {
        agentName: "XSea_查询产品",
        bridgeMessages: [
          {
            role: "assistant",
            content: "🤔 我需要知道你想查看哪个产品下的脚本，请选择一个吧？",
          },
        ],
      };
    }
  }

  public welcome(): ChatMessageX[] {
    return [
      {
        role: "assistant",
        content: "[ui-scripts]",
        // component: <ScriptSelector types={["JMETER", "GATLING", "SHELL"]} />,
      },
    ];
  }
}

const XSea_查询脚本 = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  useEffect(() => {
    const agent = new Agent_XSea_查询脚本(chatStore, navigate);
    AgentStore.register(agent.Name, agent);
  }, []);
  return <></>;
};

export default XSea_查询脚本;
