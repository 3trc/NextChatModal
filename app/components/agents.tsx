import React from "react";
import XSea_Debug from "../agent/xsea/XSea_Debug";
import XSea_查询产品 from "../agent/xsea/XSea_查询产品";

const Agents = () => {
  return (
    <>
      <XSea_Debug />
      <XSea_查询产品 />
    </>
  );
};

export default Agents;
