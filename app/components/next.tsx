import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store";
import { z } from "zod";
import axios from "axios";
import styles from "./next.module.scss";
import { nanoid } from "nanoid";

const Next = () => {
  const first = useRef<boolean>(true);
  const [list, setList] = useState<string[]>([]);
  const chatStore = useChatStore();

  const updateNext = async () => {
    try {
      const session = chatStore.currentSession();
      const mask = session.mask;
      const messages = session.messages.slice(-1);
      console.log(messages);
      const { data } = await axios.post(`/api/openai/v1/chat/completions`, {
        messages: `
## 请你结合最后一条历史消息，预测用户接下来可能会发送的四条消息

## 你的工作步骤如下
1. 选取类型T（T为上下文最新讨论的对象类型，必须为以下之一）
- 产品
- 脚本
- 计划
- 目标
- 压测记录
- 测试报告
- 定时任务

2. 选取A，B，C三个对象
- 确保A，B，C的类型都为T
- 确保A，B，C为上下文中关注度最高的3个对象

3. 根据选取的T类型和A，B，C对象，推荐以下问题
- 如果T为产品
  - A产品下有哪些脚本？
  - 我想看下B产品下面的计划
  - 属于C产品的压测记录有哪些？
  - 我想重新创建一个产品
- 如果T为脚本
  - 快速压测A脚本
  - B脚本模拟了什么样的性能测试场景
  - C脚本的代码有一些问题，你能帮我解决吗？
  - 我想你帮我编写一个脚本
- 如果T为计划
  - A计划下有哪些目标？
  - B计划下有哪些压测记录？
  - 我想看下C计划下有什么定时任务
  - 查看一下A计划下所有的测试报告
- 如果T为目标
  - 压测A目标
  - B要验证的性能指标有哪些？
  - C目标模拟的性能测试场景是什么样的？
  - 我想调节A目标的压测流量
- 如果T为压测记录
  - 解读一下A的压测结果
  - B这次压测今后如何优化改善？
  - 如何改进C的压测目标呢？
  - 还有更多压测记录吗？
- 如果T为测试报告
  - 帮我解读一下A报告，有哪些值得关注的点？
  - B报告总体上是好是坏？
  - 我想修改一下C报告
  - 当前计划下还有更多其他的报告吗？
- 如果T为定时任务
  - A定时任务下一次的运行时间是什么时候？
  - B定时任务做了什么？
  - 我想新建一个定时任务
  - C定时任务的执行配置合适吗？

4. 把T，A，B，C替换成你选取的值

## 检查回答是否符合以下要求
- 避免解释原因
- 避免输出类型序号
- 避免回答包含非JSON内容
- 避免回答包含解释文本或markdown
- 避免回答使用代码块标记

## 【重要】避免回答超过150个字符

## 最后一条历史消息是：【${messages[0].content}】
        `.trim(),
        agentName: mask.agentName,
        runId: mask.agentName,
        resourceId: mask.agentName,
        threadId: session.id + nanoid(),
        stream: false,
        output: z.tuple([
          z.string(),
          z.string(),
          z.string(),
          z.string(),
        ]).describe('用户接下来可能会发送的四条消息'),
      });
      setList(() => Array.isArray(data.object) ? data.object : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (first.current) {
      first.current = false;
      updateNext();
    }
  }, []);

  if (list.length === 0) return null;
  return <ul className={styles.com}>
    {list.map((q) => <li onClick={() => {
      chatStore.onUserInput(q);
    }}>{q.replace('A', '某').replace('B', '某').replace('C', '某')}</li>)}
  </ul>;
}

export default Next;
