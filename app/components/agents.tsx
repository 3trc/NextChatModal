import React from "react";
import XSea_模板 from "../agent/xsea/XSea_模板";
import XSea_测试 from "../agent/xsea/XSea_测试";
import XSea_测试_A from "../agent/xsea/XSea_测试_A";
import XSea_测试_B from "../agent/xsea/XSea_测试_B";
import XSea_确认机 from "../agent/xsea/XSea_确认机";

const Agents = () => {
  return (
    <>
      <XSea_测试 />
      <XSea_测试_A />
      <XSea_测试_B />
      <XSea_确认机 />
      <XSea_模板 />
    </>
  );
};

export default Agents;
