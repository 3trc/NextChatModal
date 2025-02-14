"use client";

import { Button, Space, Table, Tabs } from "antd";
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

  const [selectedScripts, setSelectedScripts] = useState<any[]>([]);

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
          rowKey="id"
          size="small"
          bordered
          showHeader={false}
          columns={[
            {
              dataIndex: "name",
              render: (_, row: any) => {
                return (
                  <a
                    href={`${"http://10.10.30.103:8081"}${row.url}`}
                    target="_blank"
                    className={styles.a_name}
                  >
                    {row.type === "JMETER" && (
                      <span className={styles.J}>J</span>
                    )}
                    {row.type === "GATLING" && (
                      <span className={styles.G}>G</span>
                    )}
                    {row.type === "SHELL" && (
                      <span className={styles.S}>S</span>
                    )}
                    <span className={styles.name}>{row.name}</span>
                  </a>
                );
              },
            },
          ]}
          dataSource={page.list ?? []}
          loading={loading}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedScripts.map((script) => script.id),
            onChange: (_, selectedRows) => {
              setSelectedScripts(selectedRows);
            },
          }}
          pagination={{
            position: ["bottomLeft"],
          }}
        />
      </div>
      <div className={styles.bottom}>
        <Space className={styles.confirm_buttons}>
          <Button
            disabled={selectedScripts.length === 0}
            size="small"
            onClick={() => setSelectedScripts([])}
          >
            清空
          </Button>
          <Button
            disabled={selectedScripts.length === 0}
            size="small"
            type="primary"
            onClick={() => {}}
          >
            选定
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ScriptSelector;
