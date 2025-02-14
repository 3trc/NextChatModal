import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Button, Steps } from "antd";
import { useChatStore } from "@/app/store";
import LocalJSON from "../xsea/localJSON";

const StatesView = () => {
  const [expand, setExpand] = useState<boolean>(true);
  const [product, setProduct] = useState<any>({});
  const [scripts, setScripts] = useState<any[]>([]);

  const chatStore = useChatStore();

  const syncStates = () => {
    setProduct(LocalJSON.selected_product ?? {});
    setScripts(LocalJSON.selected_scripts ?? []);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      syncStates();
    }, 250);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.com} style={{ width: expand ? "300px" : "100px" }}>
      <div style={{ padding: "0 1rem 1rem 0" }}>
        <Button type="primary" onClick={() => setExpand(() => !expand)}>
          {expand ? "收起" : "展开"}
        </Button>
      </div>
      <div>
        <Steps
          progressDot
          direction="vertical"
          items={[
            {
              status: "process",
              title: (
                <Button onClick={() => chatStore.onUserInputX("选择产品")}>
                  选择产品
                </Button>
              ),
              description: product.name ? (
                <a href="javascript:;">{product.name}</a>
              ) : (
                "暂未选择"
              ),
            },
            {
              status: "process",
              title: (
                <Button onClick={() => chatStore.onUserInputX("选择脚本")}>
                  选择脚本
                </Button>
              ),
              description: (
                <ul className={styles.ul}>
                  {scripts.map((script) => (
                    <li key={script.id}>
                      <a href="javascript:;">{script.name}</a>
                    </li>
                  ))}
                </ul>
              ),
            },
            ...(product.id && scripts.length > 0
              ? [
                  {
                    status: "process" as any,
                    title: (
                      <Button
                        type="primary"
                        onClick={() => chatStore.onUserInputX("开始压测")}
                      >
                        开始压测
                      </Button>
                    ),
                    description: <span>点我就可以开始压测了哦 ⚡</span>,
                  },
                ]
              : []),
          ]}
        />
      </div>
    </div>
  );
};

export default StatesView;
