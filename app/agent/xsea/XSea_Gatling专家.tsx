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
        name: "XSea_Gatling专家",
        context: [
          {
            id: "",
            role: "system",
            content: `
你是熟悉Gatling测试脚本的专家。你需要帮助用户编写Gatling脚本
如果用户要求编写或者优化代码，则确保输出语法正确的Gatling代码，否则避免输出代码
如果用户要求解释代码，避免输出代码
            `.trim(),
            date: "",
          },
        ],
        modelConfig: {
          model: "microsoft/phi-4",
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
