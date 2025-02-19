import { Button, Space } from "antd";
import React from "react";

const ProductSelectorBye = () => {
  return (
    <div className="text-rows">
      <div>👍🏻 当前，你已经成功选择了一个产品</div>
      <div>接下来你可以尝试以下，或者任意其他事情 😊</div>
      <div>
        <Space>
          <Button type="primary">创建脚本</Button>
          <Button>选择脚本</Button>
          <Button>学习什么是产品？</Button>
        </Space>
      </div>
    </div>
  );
};

export default ProductSelectorBye;
