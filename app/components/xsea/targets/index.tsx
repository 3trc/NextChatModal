import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import XSeaA, { XSeaObject } from "../xseaa";
import { SessionJSON } from "../localJSON";
import { Table } from "antd";

const Targets = () => {
  const [list, setList] = useState<XSeaObject[]>([]);

  useEffect(() => {
    setList(SessionJSON.targets);
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
          <li>解释一下83脚本</li>
          <li>鸡毛目标是干什么的</li>
          <li>帮我重新编写一个JMeter脚本吧</li>
        </ul>
      </div>
    </div>
  );
};

export default Targets;
