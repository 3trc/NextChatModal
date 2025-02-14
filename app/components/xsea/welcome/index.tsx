import React from "react";
import styles from "./index.module.scss";
import { Button, Space } from "antd";
import { useChatStore } from "@/app/store";

const Welcome = () => {
  const chatStore = useChatStore();

  return (
    <div className={styles.com}>
      <div>
        🦄
        你好，我是XSea智能体，我可以辅助你解决在使用XSea性能测试平台过程中遇到的各种问题。比如：
      </div>
      <div className={styles.buttons}>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              chatStore.onUserInputX("开始压测");
            }}
          >
            开始压测
          </Button>
          <Button
            onClick={() => {
              chatStore.onUserInputX("创建JMeter脚本");
            }}
          >
            编写脚本
          </Button>
          <Button
            onClick={() => {
              chatStore.onUserInputX("产品列表");
            }}
          >
            查看产品
          </Button>
          <Button
            onClick={() => {
              chatStore.onUserInputX("XSea是什么");
            }}
          >
            学习XSea性能测试平台
          </Button>
        </Space>
      </div>
      <div>
        或者试着说“开始压测吧”，“现在平台上有哪些JMeter脚本？”，或者任何其他话题
        😊
      </div>
    </div>
  );
};

export default Welcome;
