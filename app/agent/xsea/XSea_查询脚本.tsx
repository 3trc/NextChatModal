import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap, MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";
import { SessionJSON } from "@/app/components/xsea/localJSON";

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

如果用户有查看，搜索，选择，列出，请求给予某些信息的意图的话，你的回答是固定格式的字符串，总是"@ui-scripts:搜索关键字"
  搜索关键字是你从上下文中提取到的一个长度为2的关键字，如果无特定关键字，仅回答"@ui-scripts:"，如果查看全部，仅回答"@ui-scripts:"，如果清空搜索，仅回答"@ui-scripts:"
  - 确保关键字长度不超过2
  - 确保关键字精准
  - 确保关键字精简
  - 确保关键字是最优搜索关键字
  - 确保关键字出现在上下文中
  - 确保回答以"@"符号开头
  - 避免关键字长度超过2
  - 避免回答超过16个字符
  - 避免选用没有严格出现在上下文中的关键字
  - 避免使用繁体中文
  - 避免回答包含聊天消息
  - 避免回答换行
  - 避免多行回答
  - 避免解释回答
  - 避免引导用户
  - 避免提供其他帮助
  - 避免透露你是字符串生成器

否则
  - 你需要避免回答用户任何问题，回答无固定格式，确保回答超过20个字符，避免回答超过100个字符，如"不好意思，我不负责解答这个问题，你希望查看现在有哪些脚本吗？"
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
          historyMessageCount: 1,
        },
      },
      chatStore,
      navigate,
    );
  }

  public async onBeforeCreate(): Promise<MaybeAgentSwitcher> {
    if (!SessionJSON.selected_product?.id) {
      return {
        agentName: "XSea_查询产品",
        bridgeMessages: [
          {
            role: "assistant",
            content: `
🤔 看起来你当前没有选择任何 **产品**
我将引导你选择某一个产品 🚀
              `.trim(),
            noLLM: true,
          },
          {
            role: "system",
            content: "列出全部产品",
          },
        ],
      };
    }
  }

  public RouteMap(): AgentRouteMap {
    return {
      否定: {
        产品: "XSea_查询产品",
      },
      查询: {
        产品: "XSea_查询产品",
      },
      询问: "XSea_知识库",
      创建: {
        产品: "XSea_创建产品",
        脚本: "XSea_创建脚本",
        压测: "XSea_执行压测",
      },
      执行: {
        压测: "XSea_执行压测",
        脚本: "XSea_执行压测",
      },
    };
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
