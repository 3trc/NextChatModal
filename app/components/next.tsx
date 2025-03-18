import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store";
import axios from "axios";
import styles from "./next.module.scss";

const Next = (props: { message: any }) => {
  const first = useRef<boolean>(true);
  const [list, setList] = useState<string[]>([]);
  const chatStore = useChatStore();

  const updateNext = async (context: string) => {
    try {
      const { data } = await axios.get(`/api/next/xsea`, { params: { context } });
      setList(data ?? []);
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

  return <ul className={styles.com}>
    {list.map((q) => <li onClick={() => {
      chatStore.SendMessage(q);
    }}>{q.replace('A', '某').replace('B', '某').replace('C', '某')}</li>)}
  </ul>;
}

export default Next;
