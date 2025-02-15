import { useEffect } from "react";
import { useChatStore } from "@/app/store";
import { useNavigate } from "react-router-dom";
import Agent, { AgentLifeCycle } from "..";
import { AgentStore } from "../store";

const lifeCycle = {
  avatar: "🔄",
  name: "XSea_Debug",
  context: [
    {
      id: "",
      role: "system",
      content: `
确保中文回答，确保回答"你好"，避免回答非"你好"文本，避免回答超过两个汉字，避免回答英文
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
  onBeforeActive: () => {},
} as AgentLifeCycle;

const XSea_Debug = () => {
  const navigate = useNavigate();
  const chatStore = useChatStore();
  useEffect(() => {
    AgentStore.register(
      lifeCycle.name,
      new Agent(lifeCycle, chatStore, navigate),
    );
  }, []);
  return <></>;
};

export default XSea_Debug;
