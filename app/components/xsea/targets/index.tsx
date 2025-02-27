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
      {list.length === 1 && (
        <div>
          <XSeaA data={list[0]} emoji />
        </div>
      )}
      {list.length > 1 && <Table showHeader={false} dataSource={list} />}
    </div>
  );
};

export default Targets;
