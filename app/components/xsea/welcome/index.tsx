import React from "react";
import styles from "./index.module.scss";
import { Button } from "antd";
import { useChatStore } from "@/app/store";

const Welcome = () => {
  const chatStore = useChatStore();

  return (
    <div className={styles.com}>
      <div>
        🦄 嗨，很高兴见到你，我是 <b>XSea智能体</b>，我可以协助你解决在使用{" "}
        <b>XSea性能测试平台</b> 过程中遇到的各种问题。
      </div>
      <div className={styles.buttons}>
        <ul>
          <li>
            <div>
              <Button size="small" type="primary">
                快速压测
              </Button>
              <span>
                以更 <b>简单</b> 的方式 <b>快速</b> 发起一次压测，验证已有系统
              </span>
            </div>
          </li>
          <li>
            <div>
              <Button size="small">创建脚本</Button>
              <span>
                需要我帮助你编写一些 <b>压测脚本</b> 吗？无论是 <b>JMeter</b>{" "}
                还是 <b>Gatling</b> 亦或是 <b>Shell</b>，我都可以协助你一起完成
              </span>
            </div>
          </li>
          <li>
            <div>
              <Button size="small">创建产品</Button>
              <span>
                产品是XSea之中的 <b>顶层概念</b>，用于管理 脚本 测试计划
                等等其他性能测试相关资源
              </span>
            </div>
          </li>
          <li>
            <div>
              <Button size="small">查询脚本</Button>
              <span>
                需要查询平台上的已有脚本吗，通常我们选择了一些脚本就可以立即快速压测了哦！
              </span>
            </div>
          </li>
          <li>
            <div>
              <Button size="small">查询产品</Button>
              <span>
                如果你想了解现有的产品信息，或者需要查找某个特定的产品，请告诉我具体的需求。
              </span>
            </div>
          </li>
          <li>
            <div>
              <Button size="small">学习XSea性能测试平台</Button>
              <span>
                📚
                使用XSea的过程中遇到了难以解决的问题，试着与知识库对话，解答你的一切疑惑。
              </span>
            </div>
          </li>
          <li>
            <div>
              或者有什么具体的需求和问题吗？随时可以跟我分享！试着说“开始压测吧”，“现在平台上有哪些JMeter脚本？”，或者任何其他话题
              😊
            </div>
          </li>
        </ul>
        {/* <Space>
          <Button
            type="primary"
            onClick={() => {
              AgentStore.get(chatStore.currentSession().mask.name).SendMessage(
                "开始压测",
              );
            }}
          >
            开始压测
          </Button>
          <Button
            onClick={() => {
              AgentStore.get(chatStore.currentSession().mask.name).SendMessage(
                "创建JMeter脚本",
              );
            }}
          >
            编写脚本
          </Button>
          <Button
            onClick={() => {
              AgentStore.get(chatStore.currentSession().mask.name).SendMessage(
                "列出全部产品",
              );
            }}
          >
            查看产品
          </Button>
          <Button
            onClick={() => {
              AgentStore.get(chatStore.currentSession().mask.name).SendMessage(
                "XSea是什么",
              );
            }}
          >
            学习XSea性能测试平台
          </Button>
        </Space> */}
      </div>
    </div>
  );
};

export default Welcome;
