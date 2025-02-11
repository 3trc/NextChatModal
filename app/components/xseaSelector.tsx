"use client";

import React from "react";
import styles from "./xseaSelector.module.scss";
import { Table } from "antd";

const XSeaSelector = (props: { message: string }) => {
  return (
    <div className={styles.com}>
      <div className={styles.introduction}>
        <span>以下是脚本列表</span>
      </div>
      <div>
        <Table
          size="small"
          bordered
          columns={[
            {
              title: "名称",
              dataIndex: "name",
            },
          ]}
          dataSource={[
            {
              name: "脚本1",
            },
            {
              name: "脚本2",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default XSeaSelector;
