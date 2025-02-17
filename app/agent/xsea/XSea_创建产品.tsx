import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap } from "..";
import { AgentStore } from "../store";
import { isConfirmMessage } from "@/app/components/bottomConfirm";

interface ExtractResult {
  [key: string]: string;
}

function extractFields(text: string, fields: string[]): ExtractResult {
  const result: ExtractResult = {};

  // 预处理文本：移除多余空格，统一标点符号
  let normalizedText = text
    .replace(/[\n\r]+/g, " ") // 将换行符转换为空格
    .replace(/\s+/g, " ") // 合并多个空格
    .replace(/[：:]/g, ":") // 统一冒号
    .replace(/[*_]/g, "") // 移除markdown标记
    .trim();

  fields.forEach((field) => {
    // 尝试多种匹配模式
    const patterns = [
      // 精确匹配模式：字段名称+冒号+内容（考虑空格变化）
      new RegExp(`${field}\\s*:[\\s]*([^\\n:：。]+)`),
      // 宽松匹配模式：字段名称在内容附近
      new RegExp(`${field}[^\\n:：。]*[\\s:：][^\\n:：。]*([^\\n:：。]+)`),
      // 超宽松匹配模式：尝试找到字段名称后的任何内容
      new RegExp(`${field}[^\\n:：。]*(.+?)(?=[\\n:：。]|$)`),
    ];

    for (const pattern of patterns) {
      const match = normalizedText.match(pattern);
      if (match && match[1]) {
        result[field] = match[1].trim();
        break;
      }
    }

    // 如果所有模式都未匹配，设置为空字符串
    if (!result[field]) {
      result[field] = "";
    }
  });

  return result;
}

class _Agent extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_创建产品",
        context: [
          {
            id: "",
            role: "system",
            content: `
XSea是一个性能测试平台
你是XSea创建产品小助手，你需要在与用户对话过程中搜集以下两个字段

1. 产品名称（一般代表被测应用名称，20个字符以内）
2. 产品描述（描述性能测试需求，或者产品信息，50个字符以内）

你的工作流程有以下两个步骤

步骤1. 搜集 产品名称 和 产品描述
- 你可以根据用户描述选择合适的 产品名称 和 产品描述
- 你可以主动根据 产品名称 选择合适的 产品描述
- 你可以向用户解释这两个字段的含义
- 你可以向用户解释你是XSea创建产品小助手，可以帮助用户创建产品
- 如果用户已经提供了 产品名称 和 产品描述，则不需要搜集，直接进入步骤2
- 避免在步骤1询问用户字段是否符合要求
- 避免在步骤1做确认

步骤2. 确认 产品名称 和 产品描述
- 确保回答以"请确认"开头
- 确保列出目前已经搜集到的 产品名称 和产品描述 字段
- 确保告知用户如果确认的话产品将会创建
- 避免单独列出 产品名称
- 避免单独列出 产品描述
- 避免在列出字段的时候解释字段
- 避免在列出字段的时候出现（）符号
- 避免向用户二次确认
- 避免回答和创建产品无关的问题
- 避免回答不以"请确认"开头
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

  public RouteMap(): AgentRouteMap {
    return {
      肯定: () => {
        const messages = this.chatStore
          .currentSession()
          .messages.filter((message) => message.role === "assistant");
        const lastMessage = messages[messages.length - 1].content as string;
        if (isConfirmMessage(lastMessage)) {
          console.log(extractFields(lastMessage, ["产品名称", "产品描述"]));
        }
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
