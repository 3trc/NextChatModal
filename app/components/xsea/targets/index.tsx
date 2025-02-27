import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import XSeaA, { XSeaObject } from "../xseaa";
import { SessionJSON } from "../localJSON";
import { Table } from "antd";

const Targets = () => {
  const [list, setList] = useState<XSeaObject[]>([]);

  useEffect(() => {
    setList(SessionJSON.target);
  }, []);

  return (
    <div className={styles.com}>
      {list.length === 0 && (
        <div>好像没找到相关内容呢，尝试描述清楚一些？😊</div>
      )}
      {list.length > 0 && (
        <div className={styles.table}>
          <Table
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
  );
};

export default Targets;
