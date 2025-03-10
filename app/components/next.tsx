import React, { useEffect } from "react";
import styles from "./next.module.scss";
import { useChatStore } from "../store";

const Next = () => {
  const chatStore = useChatStore();

  useEffect(() => {
    const messages = chatStore.currentSession().messages.slice(10).map((item) => ({
      role: item.role, content: item.content,
    }));
    console.log(messages);
  }, []);

  return <ul className={styles.com}>
    <li>压测一下XXX脚本</li>
    <li>xx脚本是干什么的</li>
    <li>删除这个脚本吧</li>
  </ul>;
}

export default Next;
