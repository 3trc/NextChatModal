import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store";
import { z } from "zod";
import axios from "axios";
import styles from "./next.module.scss";
import { nanoid } from "nanoid";
import { StructuredOutputParser } from "langchain/output_parsers";

const Next = () => {
  const first = useRef<boolean>(true);
  const [list, setList] = useState<string[]>([]);
  const chatStore = useChatStore();

  const updateNext = async () => {
    try {
      const session = chatStore.currentSession();
      const mask = session.mask;
      const messages = session.messages.slice(-1);
      const context = messages[0].content as string;
      const parser = StructuredOutputParser.fromZodSchema(z.tuple([
        z.string(),
        z.string(),
        z.string(),
        z.string(),
      ]).describe('用户接下来可能会发送的四条消息'));
      const prompt = `
## 请你结合最后一条历史消息，预测用户接下来可能会发送的四条消息\n\n

## 最后一条历史消息是
【${context}】

## 确保直接回答遵循以下格式的JSON文本
${parser.getFormatInstructions()}
      `.trim();
      const { data } = await axios.post(`/api/openai/v1/chat/completions`, {
        messages: prompt,
        agentName: mask.agentName,
        runId: mask.agentName,
        resourceId: mask.agentName,
        threadId: session.id + nanoid(),
        stream: false,
      });
      const list = await parser.parse(data.text);
      setList(() => Array.isArray(list) ? list : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (first.current) {
      first.current = false;
      updateNext();
    }
  }, []);

  if (list.length === 0) return null;
  return <ul className={styles.com}>
    {list.map((q) => <li onClick={() => {
      chatStore.onUserInput(q);
    }}>{q.replace('A', '某').replace('B', '某').replace('C', '某')}</li>)}
  </ul>;
}

export default Next;
