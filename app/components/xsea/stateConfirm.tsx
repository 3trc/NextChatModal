import { Button, Space } from "antd";
import React from "react";
import { SessionJSON } from "./localJSON";

const StateConfirm = () => {
  return (
    <div className="text-rows" style={{ width: "300px" }}>
      <div>
        🦄 当前我们在{" "}
        <a
          target="_blank"
          href={`http://10.10.30.103:8081${SessionJSON.selected_product?.url}`}
        >
          {SessionJSON.selected_product?.name}
        </a>{" "}
        下面
      </div>
      <div>我们选择了以下脚本：</div>
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
      <div>是否现在开始压测呢？🤔</div>
      <div className="buttons">
        <span></span>
        <Space>
          <Button size="small" type="link">
            更换脚本
          </Button>
          <Button>取消</Button>
          <Button type="primary">压测</Button>
        </Space>
      </div>
    </div>
  );
};

export default StateConfirm;
