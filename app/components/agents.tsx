import React from "react";
import XSea_Debug from "../agent/xsea/XSea_Debug";
import XSea_执行压测 from "../agent/xsea/XSea_执行压测";
import XSea_智能体 from "../agent/xsea/XSea_智能体";
import XSea_查询产品 from "../agent/xsea/XSea_查询产品";
import XSea_查询脚本 from "../agent/xsea/XSea_查询脚本";

const Agents = () => {
  return (
    <>
      <XSea_Debug />
      <XSea_智能体 />
      <XSea_执行压测 />
      <XSea_查询产品 />
      <XSea_查询脚本 />
    </>
  );
};

export default Agents;
