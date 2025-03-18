import React, { useEffect, useRef, useState } from "react";
import styles from "./next.module.scss";
import { useChatStore } from "../store";
import axios from "axios";

const Next = (props: { message: any }) => {
  const first = useRef<boolean>(true);
  const [list, setList] = useState<string[]>([]);
  const chatStore = useChatStore();

  const updateNext = async (context: string) => {
    const { data } = await axios.get(`/api/next/xsea`, { params: { context } });
    setList(data ?? []);
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
    }}>{q.replaceAll('A', '某').replaceAll('B', '某').replaceAll('C', '某')}</li>)}
  </ul>;
}

export default Next;
