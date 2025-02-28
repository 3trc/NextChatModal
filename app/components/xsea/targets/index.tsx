import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import XSeaA, { XSeaObject } from "../xseaa";
import { SessionJSON } from "../localJSON";
import { Table } from "antd";

const Targets = () => {
  const [list, setList] = useState<XSeaObject[]>([]);
  const [nextList, setNextList] = useState<string[]>([]);

  const pickRandom = (list: XSeaObject[]) => {
    if (list.length === 0) {
      throw new Error("随机选择列表为空");
    }
    const page = list.slice(0, 5);
    return page[Math.floor(Math.random() * page.length)];
  };

  useEffect(() => {
    const targets = SessionJSON.targets;
    setList(targets);
    setNextList(() => {
      return Array(5)
        .fill(0)
        .map(() => {
          return "1234";
        });
    });
  }, []);

  return (
    <div className={styles.com}>
      <div>
        {list.length === 0 && (
          <div>好像没找到相关内容呢，尝试描述清楚一些？😊</div>
        )}
        {list.length > 0 && (
          <div className={styles.table}>
            <Table
              rowKey={(row) => {
                if (row.type === "PRODUCT") return row.productId;
                if (row.type === "SCRIPT") return row.scriptId ?? "";
                if (row.type === "PLAN") return row.planId ?? "";
                if (row.type === "GOAL") return row.goalId ?? "";
                return "";
              }}
              size="small"
              showHeader={false}
              columns={[
                {
                  render: (row) => {
                    return <XSeaA data={row} emoji />;
                  },
                },
              ]}
              dataSource={list}
              pagination={
                list.length <= 5
                  ? false
                  : {
                      pageSize: 5,
                      showSizeChanger: false,
                    }
              }
            />
          </div>
        )}
      </div>
      <div className={styles.recommend}>
        <ul className={styles.next_list}>
          {nextList.map((next) => (
            <li key={next}>{next}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Targets;
