import { AgentStore } from "@/app/agent/store";
import { Button, Space } from "antd";
import React from "react";

const ScriptSelectorBye = () => {
  return (
    <div className="text-rows">
      <div>👍🏻 当前，你已经选定了一些脚本</div>
      <div>接下来你可以尝试以下，或者任意其他事情 😊</div>
      <div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              AgentStore.get("XSea_查询脚本").SendMessage("执行压测");
            }}
          >
            执行压测
          </Button>
          <Button
            onClick={() => {
              AgentStore.get("XSea_查询脚本").SendMessage("列出全部产品");
            }}
          >
            更换产品
          </Button>
          <Button
            onClick={() => {
              AgentStore.get("XSea_查询脚本").SendMessage("什么是脚本");
            }}
          >
            学习什么是脚本？
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ScriptSelectorBye;
