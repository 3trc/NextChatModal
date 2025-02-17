import React from "react";
import XSea_模板 from "../agent/xsea/XSea_模板";
import XSea_测试 from "../agent/xsea/XSea_测试";
import XSea_测试_A from "../agent/xsea/XSea_测试_A";
import XSea_测试_B from "../agent/xsea/XSea_测试_B";
import XSea_确认机 from "../agent/xsea/XSea_确认机";
import XSea_智能体 from "../agent/xsea/XSea_智能体";
import XSea_摸摸鱼 from "../agent/xsea/XSea_摸摸鱼";
import XSea_创建产品 from "../agent/xsea/XSea_创建产品";
import XSea_创建脚本 from "../agent/xsea/XSea_创建脚本";

const Agents = () => {
  return (
    <>
      <XSea_智能体 />
      <XSea_创建产品 />
      <XSea_创建脚本 />
      <XSea_摸摸鱼 />
      <XSea_测试 />
      <XSea_测试_A />
      <XSea_测试_B />
      <XSea_确认机 />
      <XSea_模板 />
    </>
  );
};

export default Agents;
