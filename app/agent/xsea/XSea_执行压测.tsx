import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";
import { SessionJSON } from "@/app/components/xsea/localJSON";

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
            content: `
XSea是一个性能测试平台
你是XSea执行压测小助手
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

  public async onBeforeCreate(): Promise<MaybeAgentSwitcher> {
    if (!SessionJSON.selected_scripts?.length) {
      return {
        agentName: "XSea_查询脚本",
        bridgeMessages: [
          {
            role: "assistant",
            content: `
  🤔 看起来你当前没有选择任何 **JMeter** 或者 **Gatling** 脚本
  我将引导你选择脚本 🚀
              `,
          },
          {
            role: "system",
            content: "查询脚本",
          },
        ],
      };
    } else {
      return {
        bridgeMessages: [
          {
            role: "assistant",
            content: "",
            component: "@ui-StateConfirm",
            noLLM: true,
          },
        ],
      };
    }
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
