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
  return <a>{}</a>;
};

export default XSeaA;
