import React, { useEffect, useRef, useState } from "react";
import styles from "./next.module.scss";
import { useChatStore } from "../store";
import axios from "axios";

const Next = () => {
  const [list, setList] = useState<string[]>([
    '问题1',
    '问题2',
  ]);
  const chatStore = useChatStore();

  return <ul className={styles.com}>
    {list.map((q) => <li onClick={() => {
      chatStore.SendMessage(q);
    }}>{q}</li>)}
  </ul>;
}

export default Next;
