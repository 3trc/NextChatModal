"use client";

import React, { useEffect, useState } from "react";
import styles from "./xseaSelector.module.scss";
import { Table } from "antd";

const LABELS_MAP = {
  "<ui-products>": "产品",
  "<ui-jmeter-scripts>": "JMeter脚本",
  "<ui-gatling-scripts>": "Gatling脚本",
  "<ui-shell-scripts>": "Shell脚本",
  "<ui-plans>": "计划",
  "<ui-goals>": "目标",
  "<ui-records>": "记录",
} as any;

const XSeaSelector = (props: { message: string }) => {
  const label = props.message.trim();
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState({ name: "", pageNum: 1, pageSize: 10 });

  const updatePage = async (params: any = {}) => {
    const newFilter = { ...filter, ...params };
    setFilter(newFilter);
    setLoading(true);
    try {
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePage();
  }, []);

  return (
    <div className={styles.com}>
      <div className={styles.introduction}>
        <span>以下是现有的{LABELS_MAP[label]}列表</span>
      </div>
      <div>
        <Table
          size="small"
          bordered
          loading={loading}
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
          rowSelection={{
            type: "checkbox",
          }}
        />
      </div>
    </div>
  );
};

export default XSeaSelector;
