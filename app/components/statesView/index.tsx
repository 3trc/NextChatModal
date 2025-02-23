import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Button, Steps } from "antd";
import { useChatStore } from "@/app/store";
import { SessionJSON } from "../xsea/localJSON";
import { AgentStore } from "@/app/agent/store";
import FastTest from "../xsea/fastTest";

const StatesView = () => {
  const [expand, setExpand] = useState<boolean>(true);
  const [product, setProduct] = useState<any>({});
  const [scripts, setScripts] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);

  const chatStore = useChatStore();

  const syncStates = useCallback(() => {
    const oldShow = !!(product?.id || (scripts && scripts.length > 0));
    const newShow = !!(
      SessionJSON.selected_product?.id ||
      (SessionJSON.selected_scripts && SessionJSON.selected_scripts.length > 0)
    );
    setProduct(SessionJSON.selected_product ?? {});
    setScripts(SessionJSON.selected_scripts ?? []);
    setTests(SessionJSON.tests ?? []);
    if (!oldShow && newShow) {
      document.documentElement.style.setProperty("--tools-width", "240px");
      setTimeout(() => {
        setExpand(newShow);
      }, 200);
    }
    if (!newShow) {
      document.documentElement.style.setProperty("--tools-width", "0px");
      setExpand(newShow);
    }
  }, [product, scripts]);

  useEffect(() => {
    const timer = setInterval(() => {
      syncStates();
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.com} style={{ padding: expand ? "1rem" : "0px" }}>
      {/* <div style={{ padding: "0 1rem 1rem 0" }}>
        <Button type="primary" onClick={() => {
          if (expand) {
            document.documentElement.style.setProperty('--tools-width', '100px');
          } else {
            document.documentElement.style.setProperty('--tools-width', '240px');
          }
          setExpand(() => !expand);
        }}>
          {expand ? "收起" : "展开"}
        </Button>
      </div> */}
      {expand && (
        <>
          <div>
            <Steps
              progressDot
              direction="vertical"
              items={[
                {
                  status: "process",
                  title: (
                    <Button
                      onClick={() =>
                        AgentStore.get("XSea_执行压测").SendMessage(
                          "列出全部产品",
                        )
                      }
                    >
                      选择产品
                    </Button>
                  ),
                  description: product.name ? (
                    <a href="javascript:;">{product.name}</a>
                  ) : (
                    "暂未选择"
                  ),
                },
                {
                  status: "process",
                  title: (
                    <Button
                      onClick={() =>
                        AgentStore.get("XSea_执行压测").SendMessage(
                          "列出全部脚本",
                        )
                      }
                    >
                      选择脚本
                    </Button>
                  ),
                  description: (
                    <ul className={styles.ul}>
                      {scripts.map((script) => (
                        <li key={script.id}>
                          <a href="javascript:;">{script.name}</a>
                        </li>
                      ))}
                    </ul>
                  ),
                },
                ...(product.id && scripts.length > 0
                  ? [
                      {
                        status: "process" as any,
                        title: <FastTest />,
                        description: <span>点我就可以开始压测了哦 ⚡</span>,
                      },
                    ]
                  : []),
              ]}
            />
          </div>
          {tests.length > 0 && (
            <div className={styles.his_test}>
              <b>历史压测</b>
              <ul className={styles.test_list}>
                {tests.map((test, index) => (
                  <li key={test.executeRecord.id}>
                    <div>
                      <a
                        href="javascript:;"
                        onClick={() => {
                          // window.top?.open(`http://192.168.8.139:8080${test.executeRecord.url}`);
                        }}
                      >
                        {test.goal.name ?? "-"}
                      </a>
                    </div>
                    {(test.list ?? []).map((item: any) => (
                      <>
                        {item.stackDatas && (
                          <div
                            className={styles.problem}
                            onClick={() => {
                              AgentStore.get("XSea_调用栈分析").Create(
                                [
                                  {
                                    role: "system",
                                    content: `${JSON.stringify(
                                      item.stackDatas,
                                      null,
                                      2,
                                    )}\n性能瓶颈在哪？`,
                                  },
                                ],
                                true,
                              );
                            }}
                          >
                            🎛️ 发现CPU性能问题
                          </div>
                        )}
                        {item.heapHisto && (
                          <div className={styles.problem}>
                            📟 发现内存性能问题
                          </div>
                        )}
                      </>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatesView;
