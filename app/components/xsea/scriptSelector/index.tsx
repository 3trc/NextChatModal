"use client";

import { Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import axios from "axios";

const { TabPane } = Tabs;

export type ScriptType = "JMETER" | "GATLING" | "SHELL";

const ScriptSelector = (props: { types: ScriptType[] }) => {
  const [tab, setTab] = useState<ScriptType>("JMETER");

  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState({ search: "", pageNum: 1, pageSize: 5 });
  const [page, setPage] = useState({
    pageNum: 1,
    pageSize: 5,
    list: [],
    total: 0,
  });

  const updatePage = async (params: any = {}) => {
    const newFilter = { ...filter, ...params };
    setFilter(newFilter);
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/object/xsea/product/849903850940473344/script`,
        {
          params: { ...newFilter },
        },
      );
      setPage(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePage({ type: tab });
  }, []);

  return (
    <div className={styles.com}>
      <div>😄 你好，你想选择哪些脚本呢？</div>
      <div>
        <Tabs
          size="small"
          activeKey={tab}
          onChange={(activeKey) => {
            setTab(activeKey as ScriptType);
            updatePage({ type: activeKey, pageNum: 1 });
          }}
        >
          <TabPane tab="JMeter" key="JMETER" />
          <TabPane tab="Gatling" key="GATLING" />
          <TabPane tab="Shell" key="SHELL" />
        </Tabs>
      </div>
      <div>
        <Table
          size="small"
          bordered
          showHeader={false}
          columns={[{ dataIndex: "name" }]}
          dataSource={page.list ?? []}
        />
      </div>
    </div>
  );
};

export default ScriptSelector;
