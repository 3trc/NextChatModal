import { Button, Space } from "antd";
import React from "react";

const StateConfirm = () => {
  return (
    <div className="text-rows">
      <div>
        当前我们在 <a>产品</a> 下面
      </div>
      <div>我们选择了以下脚本：</div>
      <div>
        <ul>
          <li>123</li>
          <li>123</li>
        </ul>
      </div>
      <div>
        <Space>
          <Button>取消</Button>
          <Button type="primary">确认</Button>
        </Space>
      </div>
    </div>
  );
};

export default StateConfirm;
