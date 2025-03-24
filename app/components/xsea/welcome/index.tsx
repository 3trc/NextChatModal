import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useChatStore } from "@/app/store";
import { Spin } from "antd";
import axios from "axios";

const Welcome = () => {
  const chatStore = useChatStore();
  const [loading, setLoading] = useState<boolean>(true);

  const updateObjects = async () => {
    setLoading(true);
    try {
      const a = await Promise.all([
        axios.post(`/xsea/api/xsea/vector/query`, { type: 'SCRIPT', text: '脚本', topK: 1, filterScore: true }),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateObjects();
  }, []);

  return (
    <div className={styles.com}>
      <div>
        🦄 嗨，很高兴见到你，我是 <b>XSea智能体</b>，我可以帮助你解决各种问题
      </div>
      <Spin spinning={loading}>
        <div className={styles.buttons}>
          <div className={styles.summary}>
            <b>试着说</b> 😊
            <ul className={styles.try_to_say}>
              <li
                onClick={() => {
                  chatStore.onUserInput("开始压测东航下航班相关的脚本");
                }}
              >
                <span>帮我压测 xxx 下的 xxx 脚本</span>
              </li>
              <li onClick={() => {
                  chatStore.onUserInput("帮我分析一个报告吧");
                }}>
                <span>我想分析一下 xxx 压测记录</span>
              </li>
              <li
                onClick={() => {
                  chatStore.onUserInput("我想压测某些脚本");
                }}
              >
                <span>现在就开始压测吧！</span>
              </li>
              <li
                onClick={() => {
                  chatStore.onUserInput("帮我创建一个JMeter脚本吧");
                }}
              >
                <span>帮我创建一个JMeter脚本吧</span>
              </li>
              <li onClick={() => {
                  chatStore.onUserInput("我想你帮我解释某一个脚本");
                }}>
                <span>解释一下 xxx 脚本是做什么的</span>
              </li>
              <li
                onClick={() => {
                  chatStore.onUserInput("XSea之中怎么样安装探针");
                }}
              >
                <span>XSea之中怎么样安装探针</span>
              </li>
            </ul>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Welcome;
