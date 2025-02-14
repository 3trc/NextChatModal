import React, { useState } from "react";
import styles from "./index.module.scss";
import { Button, Steps } from "antd";
import { useChatStore } from "@/app/store";

const StatesView = () => {
  const [expand, setExpand] = useState<boolean>(true);

  const chatStore = useChatStore();

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
              title: "已选产品",
              description: <span>某某产品</span>,
              onClick: () => {
                chatStore.onUserInputX("选择产品");
              },
            },
            {
              status: "process",
              title: "已选脚本",
              description: <span>某某脚本</span>,
              onClick: () => {
                chatStore.onUserInputX("选择脚本");
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default StatesView;
