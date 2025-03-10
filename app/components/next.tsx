import React, { useEffect, useRef, useState } from "react";
import styles from "./next.module.scss";
import { useChatStore } from "../store";
import axios from "axios";

const Next = () => {
  const first = useRef<boolean>(false);
  const [list, setList] = useState<string[]>([]);
  const chatStore = useChatStore();

  useEffect(() => {
    if (first.current) {
      return;
    }
    first.current = true;
    (async () => {
      const messages = chatStore.currentSession().messages.slice(-4).map((item) => ({
        role: item.role, content: item.content,
      }));
      const res = await axios.post(`/api/agent/xsea/next`, messages);
      setList(res.data ?? []);
    })();
  }, []);

  return <ul className={styles.com}>
    {list.map((q) => <li>{q}</li>)}
  </ul>;
}

export default Next;
