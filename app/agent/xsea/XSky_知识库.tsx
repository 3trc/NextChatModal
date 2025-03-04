import { useEffect } from "react";
import { ChatStore, useChatStore } from "@/app/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Agent from "..";
import { AgentStore } from "../store";
import axios from "axios";

class _Agent extends Agent {
  public constructor(chatStore: ChatStore, navigate: NavigateFunction) {
    super(
      {
        avatar: "📚",
        name: "XSky_知识库",
        context: [
          {
            role: "system",
            content: `
XSky是一个Web服务监控平台
你需要回答与此相关的问题
避免回答其他非相关的问题
            `.trim(),
            id: "",
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

  public async SendMessage(message: string): Promise<any> {
    return await this.chatStore.SendMessage(message, async (message) => {
      const { data } = await axios.post(`/api/jieba/xsky`, { message });
      this.chatStore.AppendRoleMessageList(
        [
          {
            role: "system",
            content: `
XSky是一个Web服务监控平台

${JSON.stringify(data, null, 2)}

请使用以上问答知识库回答用户问题
- 确保结合上述知识库回答用户问题
- 确保结合性能测试背景回答用户问题
- 避免透露自己引用知识库
- 避免回答和监控，分析，测试无关的问题
          `.trim(),
          },
          {
            role: "user",
            content: message,
          },
        ],
        true,
      );
      return this;
    });
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
