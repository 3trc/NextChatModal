import React from "react";
import styles from "./index.module.scss";
import { useChatStore } from "@/app/store";
import { AgentStore } from "@/app/agent/store";

const Welcome = () => {
  const chatStore = useChatStore();

  return (
    <div className={styles.com}>
      <div>
        🦄 嗨，很高兴见到你，我是 <b>XSea智能体</b>，我可以帮助你解决各种问题
      </div>
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
        {/* <ul>
          <li>
            <div>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  AgentStore.get(
                    chatStore.currentSession().mask.name,
                  ).SendMessage("请开始快速压测");
                }}
              >
                快速压测
              </Button>
              <span>:</span>
              <span>
                ⚡ 以更 <b>简单</b> 的方式 <b>快速</b>{" "}
                发起一次压测，验证已有系统。
              </span>
            </div>
          </li>
          <li>
            <div>
              <Button
                size="small"
                onClick={() => {
                  AgentStore.get(
                    chatStore.currentSession().mask.name,
                  ).SendMessage("请帮我创建一个脚本");
                }}
              >
                创建脚本
              </Button>
              <span>:</span>
              <span>
                📜 需要我帮助你编写一些 <b>压测脚本</b> 吗？无论是 <b>JMeter</b>{" "}
                还是 <b>Gatling</b> 亦或是 <b>Shell</b>
                ，我都可以协助你一起完成！
              </span>
            </div>
          </li>
          <li>
            <div>
              <Button
                size="small"
                onClick={() => {
                  AgentStore.get(
                    chatStore.currentSession().mask.name,
                  ).SendMessage("请列出所有脚本");
                }}
              >
                查询脚本
              </Button>
              <span>:</span>
              <span>
                📜 需要查询平台上的 <b>已有脚本</b>{" "}
                吗，通常我们选择了一些脚本就可以立即快速压测了哦！
              </span>
            </div>
          </li>
          <li>
            <div>
              <Button
                size="small"
                onClick={() => {
                  AgentStore.get(
                    chatStore.currentSession().mask.name,
                  ).SendMessage("什么是XSea");
                }}
              >
                学习XSea性能测试平台
              </Button>
              <span>:</span>
              <span>
                📚 使用XSea的过程中遇到了难以解决的问题，试着与 <b>知识库</b>{" "}
                对话，解答你的一切疑惑。
              </span>
            </div>
          </li>
        </ul> */}
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
