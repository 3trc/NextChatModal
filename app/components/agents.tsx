import React from "react";
import XSea_Debug from "../agent/xsea/XSea_Debug";
import XSea_执行压测 from "../agent/xsea/XSea_执行压测";

const Agents = () => {
  return (
    <>
      <XSea_Debug />
      <XSea_执行压测 />
    </>
  );
};

export default Agents;
