import React from "react";
import XSea_智能体 from "../agent/xsea/XSea_智能体";
import XSea_摸摸鱼 from "../agent/xsea/XSea_摸摸鱼";
import XSea_创建产品 from "../agent/xsea/XSea_创建产品";
import XSea_创建脚本 from "../agent/xsea/XSea_创建脚本";
import XSea_查询产品 from "../agent/xsea/XSea_查询产品";
import XSea_查询脚本 from "../agent/xsea/XSea_查询脚本";
import XSea_执行压测 from "../agent/xsea/XSea_执行压测";

const Agents = () => {
  return (
    <>
      <XSea_智能体 />
      <XSea_创建产品 />
      <XSea_创建脚本 />
      <XSea_查询产品 />
      <XSea_查询脚本 />
      <XSea_执行压测 />
      <XSea_摸摸鱼 />
    </>
  );
};

export default Agents;
