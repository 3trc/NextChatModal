import React, { useEffect, useRef, useState } from "react";
import styles from "./next.module.scss";
import { useChatStore } from "../store";
import axios from "axios";

const Next = (props: { message: any }) => {
  const first = useRef<boolean>(true);
  const [list, setList] = useState<string[]>([
    '快速压测鸡毛脚本',
    '每日测试脚本模拟了什么样的性能测试场景',
  ]);
  const chatStore = useChatStore();

  useEffect(() => {
    if (first.current) {
      first.current = false;
      console.log(1234, props.message);
    }
  }, [props.message]);

  return <ul className={styles.com}>
    {list.map((q) => <li onClick={() => {
      chatStore.SendMessage(q);
    }}>{q}</li>)}
  </ul>;
}

export default Next;
