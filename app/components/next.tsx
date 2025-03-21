import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store";
import { z } from "zod";
import axios from "axios";
import styles from "./next.module.scss";
import { nanoid } from "nanoid";

const Next = () => {
  const first = useRef<boolean>(true);
  const [list, setList] = useState<string[]>([]);
  const chatStore = useChatStore();

  const updateNext = async () => {
    try {
      const session = chatStore.currentSession();
      const mask = session.mask;
      const messages = session.messages.slice(-1);
      console.log(messages);
      const { data } = await axios.post(`/api/openai/v1/chat/completions`, {
        messages: `
## 最后一条历史消息是：【${messages[0].content}】

## 请你结合最后一条历史消息，预测用户接下来可能会发送的四条消息
        `.trim(),
        agentName: mask.agentName,
        runId: mask.agentName,
        resourceId: mask.agentName,
        threadId: session.id + nanoid(),
        stream: false,
        output: z.tuple([
          z.string(),
          z.string(),
          z.string(),
          z.string(),
        ]).describe('用户接下来可能会发送的四条消息'),
      });
      setList(() => Array.isArray(data.object) ? data.object : []);
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
