import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent, { AgentRouteMap, MaybeAgentSwitcher } from "..";
import { AgentStore } from "../store";
import { isConfirmMessage } from "@/app/components/bottomConfirm";
import axios from "axios";
import { SessionJSON } from "@/app/components/xsea/localJSON";

function extractFields(text: string, fields: string[]) {
  const statements = text
    .split(/[*:：()（）\s]/)
    .map((item) => item.trim())
    .filter((item) => item);
  const result: any = {};
  fields.forEach((field) => {
    result[field] =
      statements[statements.findLastIndex((item) => item === field) + 1];
  });
  return result;
}

class _Agent extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "🔄",
        name: "XSea_创建脚本",
        context: [
          {
            id: "",
            role: "system",
            content: `
XSea是一个性能测试平台
你需要在与用户对话过程中搜集以下两个字段

1. 脚本名称（20个字符以内）
2. 脚本类型（三个可选项 JMeter，Gatling，Shell）

你的工作流程有以下三个步骤

步骤1. 搜集 脚本名称 和 脚本类型 两个字段
- 如果用户已经提供了 脚本名称 和 脚本类型，则不需要搜集，直接进入步骤2
- 避免在步骤1询问字段是否符合要求
- 避免在步骤1做确认

步骤2. 根据用户表达的需求编写特定类型的脚本
- 确保编写正确类型的脚本
- 确保编写符合用户需求的脚本
- 确保编写脚本之前深度思考用户的需求
- 确保脚本代码没有语法问题
- 确保回答仅包含一个脚本
- 避免回答包含脚本的使用方法
- 避免回答包含多个脚本
- 避免仅输出脚本的某一片段
- 如果正在编写JMeter脚本的话，确保输出的代码符合JMeter的JMX的规范，没有语法问题
- 确保输出脚本之后简单询问下"这个脚本是否符合要求？"
- 如果用户表示脚本符合要求，则进入步骤3向用户确认，否则重复步骤2
- 如果用户没有其他修改需求了，则进入步骤3向用户确认，否则重复步骤2

步骤3. 确认 脚本名称 和 脚本类型，并提示用户如果确认的话，脚本将会创建
- 确保回答以"请确认"开头
- 确保列出目前已经搜集到的 脚本名称 和 脚本类型 字段
- 确保告知用户如果确认的话脚本将会创建
- 避免单独列出 脚本名称
- 避免单独列出 脚本描述
- 避免在列出字段的时候解释字段
- 避免在列出字段的时候出现（）符号
- 避免向用户二次确认
- 避免回答和创建脚本无关的问题
- 避免回答不以"请确认"开头

确保遵循以上三步流程
避免逃出以上三步骤流程
确保你自己明确当前是哪一步骤
避免向用户透露当前的处于哪一步骤
避免向用户透露自己是什么

如果已经成功创建某个脚本，清空脚本名称，清空脚本类型，清空搜集到的需求，回到步骤1
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
    if (!SessionJSON.selected_product?.id) {
      return {
        agentName: "XSea_查询产品",
        bridgeMessages: [
          {
            role: "assistant",
            content: `
🤔 看起来你当前没有选择任何 **产品**
我将引导你选择产品 🚀
              `,
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
      肯定: async () => {
        const messages = this.chatStore
          .currentSession()
          .messages.filter((message) => message.role === "assistant");
        const lastMessage = messages[messages.length - 1].content as string;
        if (isConfirmMessage(lastMessage)) {
          const params = extractFields(lastMessage, ["脚本名称", "脚本类型"]);
          const scriptName: string = params["脚本名称"];
          const scriptType: string = params["脚本类型"]?.toUpperCase();
          const allContext = this.chatStore
            .currentSession()
            .messages.filter((message) => message.role === "assistant")
            .map((message) => message.content)
            .join("\n");
          const allParts = allContext
            .split("```")
            .map((item) => item.trim())
            .filter((item) => item);
          let key = "xml";
          if (scriptType === "JMETER") key = "xml";
          if (scriptType === "GATLING") key = "scala";
          if (scriptType === "SHELL") key = "bash";
          const content = (
            allParts.findLast((part) => part.startsWith(key)) ?? key
          )
            .slice(key.length)
            .trim();
          const res = await axios.post(
            `/api/object/xsea/product/${SessionJSON.selected_product?.id}/script`,
            { name: scriptName, type: scriptType, content },
          );
          const { name, url } = res.data;
          SessionJSON.selected_scripts = [res.data];
          return {
            bridgeMessages: [
              {
                role: "assistant",
                content:
                  "我将会清空脚本名称，清空脚本类型，清空搜集到的需求，回到步骤1",
                component: `
✨ 已为你成功在 **[${SessionJSON.selected_product?.name}](http://10.10.30.103:8081${SessionJSON.selected_product?.url})** 下，创建脚本 **[${name}](http://10.10.30.103:8081${url})**
想使用此脚本进行压测吗，试着说“开始压测吧”，我们将一起执行一次压测
当然你也可以让我帮你执行其他任务，或者随意聊聊天
                `.trim(),
              },
            ],
          };
        }
      },
      查询: {
        产品: "XSea_查询产品",
      },
      询问: {
        产品: "XSea_查询产品",
      },
      创建: {
        产品: "XSea_创建产品",
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
