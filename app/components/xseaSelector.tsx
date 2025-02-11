"use client";

import React, { useEffect, useState } from "react";
import styles from "./xseaSelector.module.scss";
import { Table } from "antd";
import axios, { AxiosResponse } from "axios";

const workspaceId = "849903850940473344";
const planId = "841402405221584896";

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
  const [filter, setFilter] = useState({ name: "", pageNum: 1, pageSize: 5 });
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
      let res: AxiosResponse<any, any>;
      if (label === "<ui-products>") {
        res = await axios.get("/api/object/xsea/product", {
          params: newFilter,
        });
        setPage(res.data);
      }
      if (label === "<ui-plans>") {
        res = await axios.get(`/api/object/xsea/product/${workspaceId}/plan`, {
          params: newFilter,
        });
        setPage(res.data);
      }
      if (label === "<ui-goals>") {
        res = await axios.get(
          `/api/object/xsea/product/${workspaceId}/plan/${planId}/goal`,
          { params: newFilter },
        );
        setPage(res.data);
      }
      if (label === "<ui-records>") {
        res = await axios.get(
          `/api/object/xsea/product/${workspaceId}/plan/${planId}/test-record`,
          { params: newFilter },
        );
        setPage(res.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePage();
  }, [props.message]);

  return (
    <div className={styles.com}>
      <div className={styles.introduction}>
        <span>以下是现有可供选择的{LABELS_MAP[label]}列表：</span>
      </div>
      <div>
        <Table
          rowKey="id"
          size="small"
          bordered
          loading={loading}
          columns={[
            {
              title: "名称",
              dataIndex: "name",
            },
          ]}
          dataSource={page.list ?? []}
          rowSelection={{
            type: "checkbox",
          }}
          pagination={{
            total: page.total ?? 0,
            current: page.pageNum ?? 1,
            pageSize: page.pageSize ?? 5,
            onChange: (pageNum, pageSize) => updatePage({ pageNum, pageSize }),
          }}
        />
      </div>
    </div>
  );
};

export default XSeaSelector;
