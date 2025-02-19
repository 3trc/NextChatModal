"use client";

import React from "react";
import ProductSelector from "./xsea/productSelector";
import ScriptSelector from "./xsea/scriptSelector";
import Welcome from "./xsea/welcome";
import ProductSelectorBye from "./xsea/productSelector/bye";
import ScriptSelectorBye from "./xsea/scriptSelector/bye";

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

const getSearch = (message: string) => {
  const firstLine = message.split("\n")[0];
  return (firstLine.split(":")[1] ?? "").trim();
};

const XSeaSelector = (props: { message: string }) => {
  if (props.message.startsWith("@ui-products")) {
    return <ProductSelector search={getSearch(props.message)} />;
  }
  if (props.message.startsWith("@ui-scripts")) {
    return <ScriptSelector search={getSearch(props.message)} />;
  }
  if (props.message.startsWith("@ui-welcome")) {
    return <Welcome />;
  }
  if (props.message.startsWith("@ui-ProductSelectorBye")) {
    return <ProductSelectorBye />;
  }
  if (props.message.startsWith("@ui-ScriptSelectorBye")) {
    return <ScriptSelectorBye />;
  }
  return props.message;
};

export default XSeaSelector;
