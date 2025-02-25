import React from "react";

export interface XSeaObject {
  type: "PRODUCT" | "SCRIPT" | "PLAN" | "GOAL" | "RECORD" | "REPORT";
  productId: string;
  productName: string;
  scriptId?: string;
  scriptName?: string;
  planId?: string;
  planName?: string;
  goalId?: string;
  goalName?: string;
}

const XSeaA = (props: { data: any }) => {
  return <a>{}</a>;
};

export default XSeaA;
