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
        name: "XSea_查询脚本",
        context: [
          {
            id: "",
            role: "system",
            content: `
你是一个字符串生成器

如果用户有查看，搜索，选择，列出，的意图的话，你的回答是固定格式的字符串，总是"@ui-scripts:搜索关键字"
  搜索关键字是你从上下文中提取到的一个长度为2的关键字，如果无特定关键字，仅回答"@ui-scripts:"，如果查看全部，仅回答"@ui-scripts:"，如果清空搜索，仅回答"@ui-scripts:"
  - 确保关键字长度不超过2
  - 确保关键字精准
  - 确保关键字精简
  - 确保关键字是最优搜索关键字
  - 确保关键字曾经出现在上下文中
  - 确保回答以"@"符号开头
  - 避免关键字长度超过2
  - 避免回答超过16个字符
  - 避免回答包含聊天消息
  - 避免回答换行
  - 避免多行回答
  - 避免解释回答
  - 避免引导用户
  - 避免提供其他帮助

否则
  - 你需要避免回答用户任何问题，回答无固定格式，确保回答超过20个字符，避免回答超过100个字符，如"不好意思，我不负责解答这个问题，你希望查看现在有哪些脚本吗？"
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
          historyMessageCount: 1,
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
