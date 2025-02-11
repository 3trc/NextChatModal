"use client";

import React from "react";
import styles from "./xseaSelector.module.scss";

const XSeaSelector = (props: { message: string }) => {
  return (
    <div className={styles.com}>
      <ul className={styles.list}>
        <li>
          <input type="checkbox" />
          <span>脚本1</span>
        </li>
        <li>
          <input type="checkbox" />
          <span>脚本2</span>
        </li>
      </ul>
      <div>
        <button>确认</button>
      </div>
    </div>
  );
};

export default XSeaSelector;
