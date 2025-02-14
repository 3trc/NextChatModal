"use client";

import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import axios from "axios";
import LocalJSON from "../localJSON";

const ProductSelector = () => {
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
      const res = await axios.get(`/api/object/xsea/product`, {
        params: { ...newFilter },
      });
      setPage(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    updatePage();
  }, []);

  const [selectedScripts, setSelectedScripts] = useState<any[]>([]);

  const SetSelectedScripts = (products: any[]) => {
    setSelectedScripts(products);
    LocalJSON.selected_product = products[0] ?? null;
    LocalJSON.selected_scripts = [];
  };

  return (
    <div className={styles.com}>
      <div>
        <span>😊 你好，平台上现有以下产品可供选择</span>
        <span>你想选择哪个产品呢？</span>
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
                    <span className={styles.name}>{row.name}</span>
                  </a>
                );
              },
            },
          ]}
          dataSource={page.list ?? []}
          loading={loading}
          rowSelection={{
            type: "radio",
            selectedRowKeys: selectedScripts.map((script) => script.id),
            onChange: (_, selectedRows) => {
              SetSelectedScripts(selectedRows);
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
            onClick={() => {}}
          >
            选定
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ProductSelector;
