"use client";

import React from "react";
import ProductSelector from "./xsea/productSelector";
import ScriptSelector from "./xsea/scriptSelector";
import Welcome from "./xsea/welcome";
import TestConfirm from "./xsea/testConfirm";

const workspaceId = "849903850940473344";
const planId = "841402405221584896";

const LABELS_MAP = {
  "[ui-products]": "产品",
  "[ui-jmeter-scripts]": "JMeter脚本",
  "[ui-gatling-scripts]": "Gatling脚本",
  "[ui-shell-scripts]": "Shell脚本",
  "[ui-plans]": "计划",
  "[ui-goals]": "目标",
  "[ui-records]": "记录",
} as any;

const XSeaSelector = (props: { message: string }) => {
  if (props.message.includes("products")) {
    return <ProductSelector />;
  } else if (props.message.includes("scripts")) {
    return <ScriptSelector types={["JMETER", "GATLING", "SHELL"]} />;
  } else if (props.message.includes("welcome")) {
    return <Welcome />;
  } else if (props.message.includes("confirm")) {
    return <TestConfirm />;
  }
  {
    return <span>...</span>;
  }
};

export default XSeaSelector;
