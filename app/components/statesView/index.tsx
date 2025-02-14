import React, { useState } from "react";
import styles from "./index.module.scss";
import { Button } from "antd";

const StatesView = () => {
  const [expand, setExpand] = useState<boolean>(true);

  return (
    <div className={styles.com} style={{ width: expand ? "300px" : "100px" }}>
      <Button type="primary" onClick={() => setExpand(() => !expand)}>
        {expand ? "收起" : "展开"}
      </Button>
    </div>
  );
};

export default StatesView;
