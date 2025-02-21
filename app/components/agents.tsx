import React, { useEffect } from "react";
import XSea_智能体 from "../agent/xsea/XSea_智能体";
import XSea_摸摸鱼 from "../agent/xsea/XSea_摸摸鱼";
import XSea_创建产品 from "../agent/xsea/XSea_创建产品";
import XSea_创建脚本 from "../agent/xsea/XSea_创建脚本";
import XSea_查询产品 from "../agent/xsea/XSea_查询产品";
import XSea_查询脚本 from "../agent/xsea/XSea_查询脚本";
import XSea_执行压测 from "../agent/xsea/XSea_执行压测";
import XSea_调用栈分析 from "../agent/xsea/XSea_调用栈分析";
import { AgentStore } from "../agent/store";

const Agents = () => {
  const receiveMessage = (data: any) => {
    const message = data.data ?? {};
    console.log(message);
    if (message.from === "ai_parent") {
      AgentStore.get(message.expertName).Create(
        [
          {
            role: "system",
            content: `${message.problem}\n性能瓶颈在哪里？`,
          },
        ],
        true,
      );
    }
  };

  useEffect(() => {
    window.addEventListener("message", receiveMessage);
    const timer = setInterval(() => {
      window.top?.postMessage(
        {
          from: "ai_iframe",
          type: "heartbeat",
        },
        "*",
      );
    }, 250);
    return () => {
      window.removeEventListener("message", receiveMessage);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <XSea_智能体 />
      <XSea_创建产品 />
      <XSea_创建脚本 />
      <XSea_查询产品 />
      <XSea_查询脚本 />
      <XSea_执行压测 />
      <XSea_调用栈分析 />
      <XSea_摸摸鱼 />
    </>
  );
};

export default Agents;
