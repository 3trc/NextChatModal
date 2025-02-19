import { AgentStore } from "@/app/agent/store";
import { Button, Space } from "antd";
import React from "react";
import { SessionJSON } from "../localJSON";

const ScriptSelectorBye = () => {
  return (
    <div className="text-rows">
      <div>
        👍🏻 当前，我们已经在{" "}
        <a
          target="_blank"
          href={`http://10.10.30.103:8081${SessionJSON.selected_product?.url}`}
        >
          {SessionJSON.selected_product?.name}
        </a>{" "}
        产品下面选择了一些脚本
      </div>
      <div>
        <ul>
          {(SessionJSON.selected_scripts ?? []).map(
            (script: any, index: number) => (
              <li key={script.id}>
                <span>{`${index + 1}.`}</span>
                <a
                  target="_blank"
                  href={`http://10.10.30.103:8081${script?.url}`}
                >
                  {script.name}
                </a>
              </li>
            ),
          )}
        </ul>
      </div>
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
