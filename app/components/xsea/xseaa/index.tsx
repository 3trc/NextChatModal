import React, { useMemo } from "react";

export interface XSeaObject {
  type:
    | "PRODUCT"
    | "SCRIPT"
    | "PLAN"
    | "GOAL"
    | "RECORD"
    | "REPORT"
    | "SCHEDULE";
  productId: string;
  productName: string;
  scriptId?: string;
  scriptName?: string;
  planId?: string;
  planName?: string;
  goalId?: string;
  goalName?: string;
}

export type XSeaObjectTypeMap<T> = {
  [key in XSeaObject["type"]]: T;
};

export const EmojiMap: XSeaObjectTypeMap<string> = {
  PRODUCT: "🧰",
  SCRIPT: "📝",
  PLAN: "📅",
  GOAL: "🎯",
  RECORD: "📋",
  REPORT: "📊",
  SCHEDULE: "⏰",
};

export const NameMap: XSeaObjectTypeMap<string> = {
  PRODUCT: "产品",
  SCRIPT: "脚本",
  PLAN: "计划",
  GOAL: "目标",
  RECORD: "记录",
  REPORT: "报告",
  SCHEDULE: "定时任务",
};

const XSeaA = (props: { data: XSeaObject }) => {
  const { data } = props;
  const name = useMemo(() => {
    const nameMap: XSeaObjectTypeMap<string | undefined> = {
      PRODUCT: data.productName,
      SCRIPT: data.scriptName,
      PLAN: data.planName,
      GOAL: data.goalName,
      RECORD: undefined,
      REPORT: undefined,
      SCHEDULE: undefined,
    };
    return nameMap[data.type];
  }, [data]);
  return <a>{name ?? `未知${NameMap[data.type] ?? ""}`}</a>;
};

export default XSeaA;
