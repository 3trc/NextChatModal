import React from "react";
import XSea_Debug from "../agent/xsea/XSea_Debug";
import XSea_执行压测 from "../agent/xsea/XSea_执行压测";
import XSea_智能体 from "../agent/xsea/XSea_智能体";

const Agents = () => {
  return (
    <>
      <XSea_Debug />
      <XSea_智能体 />
      <XSea_执行压测 />
    </>
  );
};

export default Agents;
