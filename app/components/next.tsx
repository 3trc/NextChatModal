import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store";
import { z } from 'zod';
import axios from "axios";
import styles from "./next.module.scss";

const Next = (props: { message: any }) => {
  const first = useRef<boolean>(true);
  const [list, setList] = useState<string[]>([]);
  const chatStore = useChatStore();

  const updateNext = async (context: string) => {
    try {
      const session = chatStore.currentSession();
      const mask = session.mask;
      const { data } = await axios.post(`/api/openai/v1/chat/completions`, {
        messages: '接下来我可以问怎么问题呢',
        agentName: mask.agentName,
        runId: mask.agentName,
        resourceId: mask.agentName,
        threadId: session.id,
        stream: false,
        output: z.tuple([
          z.string().max(20),
          z.string().max(20),
          z.string().max(20),
          z.string().max(20),
        ]).describe('自动推荐出的下一个用户消息，一共四个'),
      });
      setList(data.object ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (first.current) {
      first.current = false;
      updateNext(props.message.content);
    }
  }, [props.message]);

  if (list.length === 0) return null;
  return <ul className={styles.com}>
    {list.map((q) => <li onClick={() => {
      chatStore.SendMessage(q);
    }}>{q.replace('A', '某').replace('B', '某').replace('C', '某')}</li>)}
  </ul>;
}

export default Next;
