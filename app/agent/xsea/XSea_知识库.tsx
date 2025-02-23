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
        name: "XSea_知识库",
        context: [
          {
            id: "",
            role: "system",
            content: `
请你结合上述问答知识库，并且结合性能测试的背景知识，回答用户的问题
避免透露自己引用知识库
避免回答与性能测试无关的问题
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

const 知识库搜集Promot = `
XSea是一个性能测试平台，其中支持JMeter，Gatling，Shell，SeaMeter四种类型的脚本。
JMeter和Gatling用来做发压脚本，Shell主要是用来做性能测试的前后置任务。SeaMeter是平台基于JMeter自研的一种通过低代码编排发压的脚本类型。
这是关于XSea性能测试平台的文档。我希望你结合性能测试的背景知识，全局深度思考，理解XSea性能测试平台的方方面面。接下来我会交给你特定任务。

我正在面向phi4:14b这样的小模型设计一个知识库问答系统，我需要你帮我生成一些{"q": "xxxx?", "a": "xxxx."}这样格式的JSON问答数组，作为小模型的预置prompt知识库。
你需要结合XSea性能测试平台的背景为我生成，并且深度思考，选取最常用的用户疑问点或者概念。
现在我需要你帮我生成10个这样的问答，有关于 XSea性能测试平台的使用流程 方面的
`;
