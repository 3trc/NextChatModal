import React from "react";
import XSea_执行压测 from "../agent/xsea/XSea_执行压测";
import XSea_智能体 from "../agent/xsea/XSea_智能体";
import XSea_查询产品 from "../agent/xsea/XSea_查询产品";
import XSea_查询脚本 from "../agent/xsea/XSea_查询脚本";
import XSea_知识库 from "../agent/xsea/XSea_知识库";
import XSea_确认压测 from "../agent/xsea/XSea_确认压测";
import XSea_模板 from "../agent/xsea/XSea_模板";
import XSea_测试 from "../agent/xsea/XSea_测试";
import XSea_测试_A from "../agent/xsea/XSea_测试_A";
import XSea_测试_B from "../agent/xsea/XSea_测试_B";

const Agents = () => {
  return (
    <>
      <XSea_智能体 />
      <XSea_执行压测 />
      <XSea_查询产品 />
      <XSea_查询脚本 />
      <XSea_知识库 />
      <XSea_确认压测 />
      <XSea_测试 />
      <XSea_测试_A />
      <XSea_测试_B />
      <XSea_模板 />
    </>
  );
};

export default Agents;
