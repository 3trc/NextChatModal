"use client";

import { Button, Space, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import LocalJSON from "../localJSON";
import { useChatStore } from "@/app/store";

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

  const SetSelectedScripts = (scripts: any[]) => {
    setSelectedScripts(scripts);
    LocalJSON.selected_scripts = scripts;
  };

  const chatStore = useChatStore();

  return (
    <div className={styles.com}>
      <div>
        <span>
          😄 你好，
          <a
            href={`${"http://10.10.30.103:8081"}${LocalJSON.selected_product
              ?.url}`}
            className={styles.a_product}
          >
            {LocalJSON.selected_product?.name}
          </a>
          &nbsp;产品下有如下脚本可供选择，
        </span>
        <span>你想选择哪些脚本呢？</span>
      </div>
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
            onClick={() => SetSelectedScripts([])}
          >
            清空
          </Button>
          <Button
            disabled={selectedScripts.length === 0}
            size="small"
            type="primary"
            onClick={() => {
              SetSelectedScripts(selectedScripts);
              chatStore.onUserInputX("开始压测");
            }}
          >
            选定
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ScriptSelector;
