import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Space } from "antd";
import styles from "./index.module.scss";
import { ChatMessageX } from "@/app/agent";

export const isConfirmMessage = (message: string) => {
  return message
    .split("\n")
    .some((line) => line.trim().startsWith("请确认") && !line.includes("符合"));
};

export default function BottomConfirm(props: { message: ChatMessageX }) {
  const [show, setShow] = useState<boolean>(false);
  const timer = useRef<any>();

  const shouldShow = useMemo(() => {
    return (
      props.message.role === "assistant" &&
      isConfirmMessage(props.message.content)
    );
  }, [props.message.role, props.message.content]);

  useEffect(() => {
    if (props.message.role === "assistant" && shouldShow) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setShow(true);
      }, 1000);
    }
  }, [props.message.role, props.message.content]);

  if (show) {
    return (
      <div className={styles.com}>
        <span></span>
        <Space>
          <Button size="small">取消</Button>
          <Button size="small" type="primary">
            确认
          </Button>
        </Space>
      </div>
    );
  }
  return <></>;
}
