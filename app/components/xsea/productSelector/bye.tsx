import { AgentStore } from "@/app/agent/store";
import { useChatStore } from "@/app/store";
import { Button, Space } from "antd";
import React from "react";
import { SessionJSON } from "../localJSON";

const ProductSelectorBye = () => {
  const chatStore = useChatStore();

  return (
    <div className="text-rows">
      <div>
        👍🏻 当前，你已经成功选择了一个产品{" "}
        <a
          target="_blank"
          href={`http://10.10.30.103:8081${SessionJSON.selected_product?.url}`}
        >
          {SessionJSON.selected_product?.name}
        </a>
      </div>
      <div>接下来你可以尝试以下，或者任意其他事情 😊</div>
      <div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              AgentStore.get("XSea_查询产品").SendMessage("创建脚本");
            }}
          >
            创建脚本
          </Button>
          <Button
            onClick={() => {
              AgentStore.get("XSea_查询产品").SendMessage("列出全部脚本");
            }}
          >
            选择脚本
          </Button>
          <Button
            onClick={() => {
              AgentStore.get("XSea_查询产品").SendMessage("什么是产品");
            }}
          >
            学习什么是产品？
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ProductSelectorBye;
