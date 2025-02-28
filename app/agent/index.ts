import { Path } from "@/app/constant";
import { BuiltinMask } from "@/app/masks";
import { ChatStore } from "@/app/store";
import { Mask } from "@/app/store/mask";
import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";
import { AgentStore } from "./store";
import { nanoid } from "nanoid";
import axios from "axios";
import { SessionJSON } from "../components/xsea/localJSON";
import { XSeaObject } from "../components/xsea/xseaa";

export interface ChatMessageX {
  role: "system" | "user" | "assistant";
  content: string;
  component?: ReactNode;
  noLLM?: boolean;
  noUI?: boolean;
  noHistory?: boolean;
}

export interface AgentSwitcher {
  agentName?: string;
  bridgeMessages?: ChatMessageX[];
}

export type MaybeAgentSwitcher = AgentSwitcher | null | undefined | void;
export type MaybeAgentSwitcherCallback = () =>
  | MaybeAgentSwitcher
  | Promise<MaybeAgentSwitcher>;
export type MaybeAgentSwitcherKey = string | MaybeAgentSwitcherCallback;

export type AgentRouteMap =
  | {
      [actionName: string]:
        | {
            [entityName: string]: MaybeAgentSwitcherKey;
          }
        | MaybeAgentSwitcherKey;
    }
  | MaybeAgentSwitcherKey;

export default class Agent {
  public constructor(
    public readonly mask: Omit<BuiltinMask, "lang" | "builtin" | "createdAt">,
    public readonly chatStore: ChatStore,
    public readonly navigate: NavigateFunction,
  ) {
    this.id = nanoid();
  }

  private id = "";

  public welcome() {
    return [] as ChatMessageX[];
  }

  public onBeforeCreate(): Promise<MaybeAgentSwitcher> {
    return Promise.resolve();
  }

  public async SwitchAgent(
    switcher: AgentSwitcher,
    userMessage?: ChatMessageX,
  ) {
    let nextAgent: Agent = this;
    let sendMessages: ChatMessageX[] = [];
    if (switcher.agentName) {
      sendMessages = [
        ...this.chatStore.currentSession().messages.map(
          (message) =>
            ({
              ...message,
              noLLM: true,
            }) as ChatMessageX,
        ),
        ...(userMessage ? [userMessage] : []),
        ...(switcher.bridgeMessages ?? []),
      ];
      nextAgent = AgentStore.get(switcher.agentName);
    } else {
      sendMessages = [
        ...(userMessage ? [userMessage] : []),
        ...(switcher.bridgeMessages ?? []),
      ];
    }
    const lastMessageRole = sendMessages[sendMessages.length - 1]?.role;
    const trigger = lastMessageRole && lastMessageRole !== "assistant";
    if (switcher.agentName) {
      if (switcher.agentName === "XSea_知识库") {
        await nextAgent.Create([], false);
        nextAgent.SendMessage(userMessage?.content as string);
      } else {
        await nextAgent.Create(sendMessages, trigger);
      }
    } else {
      if (trigger && sendMessages.length === 0) {
        await this.chatStore.AppendEmptyMessage();
      } else {
        await this.chatStore.AppendRoleMessageList(sendMessages, trigger);
      }
    }
    return nextAgent;
  }

  public async SendMessage(message: string) {
    return await this.chatStore.SendMessage(message, async (message) => {
      if (message.toLowerCase().includes("注入cpu")) {
        await axios.post(`/api/agent/xchaos`, {
          taskId: "1887384229074038786",
        });
        this.chatStore.AppendRoleMessageList(
          [
            {
              role: "user",
              content: message,
            },
            {
              role: "assistant",
              content: "已经为你成功注入CPU故障 🐞",
            },
          ],
          false,
        );
        return this;
      }

      if (message.toLowerCase().includes("注入内存")) {
        await axios.post(`/api/agent/xchaos`, {
          taskId: "1887381615393501186",
        });
        this.chatStore.AppendRoleMessageList(
          [
            {
              role: "user",
              content: message,
            },
            {
              role: "assistant",
              content: "已经为你成功注入内存故障 🐞",
            },
          ],
          false,
        );
        return this;
      }

      const switcher = await this.onBeforeSendMessage(message);

      // if (message.toLowerCase().includes("下的")) {
      //   let flag = false;
      //   if (message.includes("东")) {
      //     if (message.includes("登录")) {
      //       SessionJSON.selected_product = {
      //         id: "849903850940473344",
      //         name: "东航-探针采集数据场景验证",
      //         url: "/822313712173449216/product/business/849903850940473344/overview?tab=0",
      //       };
      //       SessionJSON.selected_scripts = [
      //         {
      //           id: "841406834943479808",
      //           name: "登录接口压测",
      //           type: "JMETER",
      //           url: "/822313712173449216/product/business/849903850940473344/script?scriptId=841406834943479808",
      //         },
      //       ];
      //       flag = true;
      //     } else {
      //       SessionJSON.selected_product = {
      //         id: "849903850940473344",
      //         name: "东航-探针采集数据场景验证",
      //         url: "/822313712173449216/product/business/849903850940473344/overview?tab=0",
      //       };
      //       SessionJSON.selected_scripts = [
      //         {
      //           id: "724647819989913600",
      //           name: "获取航班信息",
      //           type: "JMETER",
      //           url: "/822313712173449216/product/business/849903850940473344/script?scriptId=724647819989913600",
      //         },
      //       ];
      //       flag = true;
      //     }
      //   }
      //   if (message.includes("移")) {
      //     SessionJSON.selected_product = {
      //       id: "905025758354444288",
      //       name: "中移联调使用产品",
      //       url: "/822313712173449216/product/business/905025758354444288/overview?tab=0",
      //     };
      //     SessionJSON.selected_scripts = [
      //       {
      //         id: "783639651470839810",
      //         name: "zySceneId-93",
      //         type: "JMETER",
      //         url: "/822313712173449216/product/business/905025758354444288/script?scriptId=783639651470839810",
      //       },
      //     ];
      //     flag = true;
      //   }

      //   if (flag) {
      //     // 临时加上Loading
      //     await new Promise<void>((resolve) => {
      //       setTimeout(() => {
      //         resolve();
      //       }, 1000);
      //     });
      //     this.chatStore.AppendRoleMessageList(
      //       [
      //         {
      //           role: "user",
      //           content: message,
      //         },
      //         {
      //           role: "assistant",
      //           content: "",
      //           component: "@ui-ScriptSelectorBye",
      //         },
      //       ],
      //       false,
      //     );
      //     return this;
      //   }
      // }

      if (switcher) {
        const nextAgent = await this.SwitchAgent(switcher, {
          role: "user",
          content: message,
        });
        return nextAgent;
      }
    });
  }

  public async SendMessageList(messages: ChatMessageX[]) {
    if (messages.length < 1) return;
    await this.chatStore.SendMessages(messages);
  }

  public RouteMap(): AgentRouteMap {
    return {};
  }

  public async onBeforeSendMessage(
    message: string,
  ): Promise<MaybeAgentSwitcher> {
    try {
      const session = this.chatStore.currentSession();
      const prevMessages = session.messages;
      const maskName = this.chatStore.currentSession().mask.name;
      const dialogue = {
        // scene: maskName.split("_")[1] ?? maskName,
        question:
          prevMessages[prevMessages.length - 1]?.content &&
          !(prevMessages[prevMessages.length - 1].content as string).startsWith(
            "@",
          )
            ? prevMessages[prevMessages.length - 1].content
            : "你好，有什么可以帮你的吗？",
        answer: message,
        querys: [
          prevMessages.findLast((item) => item.role === "user")?.content ?? "",
          message,
        ],
      };
      const res = await axios.post(`/api/agent/xsea/router`, dialogue);
      const { action, entity, intention, objects } = res.data;

      // 如果是有副作用的行为，则存储
      if (["压测"].includes(action)) {
        SessionJSON.background = action;
      }

      const targets: XSeaObject[] = objects?.list ?? [];
      SessionJSON.targets = targets;
      if (targets.length === 1) {
        SessionJSON.target = targets[0];
      } else if (targets.length > 1) {
        return {
          bridgeMessages: [
            {
              role: "assistant",
              content: `你需要${action}的${entity}是什么？`,
              component: "@ui-target",
            },
          ],
        };
      } else {
        return {
          bridgeMessages: [
            {
              role: "system",
              content: "提示引导用户描述更清楚的描述需求",
            },
          ],
        };
      }

      const target = SessionJSON.target;
      if (target) {
        if (SessionJSON.background === "压测") {
          if (target.type === "SCRIPT") {
            return {
              bridgeMessages: [
                {
                  role: "system",
                  content: `
请询问用户是否压测 ${JSON.stringify(target, null, 2)} 脚本
确保直接询问用户是否确认
确保加粗名称信息
确保语气专业
避免透露JSON格式的内容
避免透露寻找过程
避免确认其他信息
避免在名称处使用引号
避免长篇大论
                  `.trim(),
                },
              ],
            };
          } else if (target.type === "GOAL") {
            return {
              bridgeMessages: [
                {
                  role: "system",
                  content: `
请询问用户是否压测 ${JSON.stringify(target, null, 2)} 目标
确保直接询问用户是否确认
确保以markdown回答
确保语气专业
避免透露JSON格式的内容
避免透露寻找过程
避免确认其他信息
避免在名称处使用引号
避免长篇大论
                  `.trim(),
                },
              ],
            };
          }
        }
      }

      const routeMap = this.RouteMap();
      let switcher: MaybeAgentSwitcher = null;
      if (typeof routeMap === "object") {
        const layer1 = routeMap[action];
        if (typeof layer1 === "object") {
          const layer2 = layer1[entity];
          if (typeof layer2 === "string") {
            switcher = { agentName: layer2 };
          } else if (typeof layer2 === "function") {
            switcher = await layer2();
          }
        } else if (typeof layer1 === "string") {
          switcher = { agentName: layer1 };
        } else if (typeof layer1 === "function") {
          switcher = await layer1();
        }
      } else if (typeof routeMap === "string") {
        switcher = { agentName: routeMap };
      } else if (typeof routeMap === "function") {
        switcher = await routeMap();
      }

      if (switcher?.agentName) {
        const agentName = switcher.agentName;
        if (
          ["XSea_执行压测", "XSea_创建脚本", "XSea_创建产品"].includes(
            agentName,
          )
        ) {
          SessionJSON.background = agentName;
        }
      }
      console.log("【Intention】:", intention, "【Switcher】", switcher);
      return switcher;
    } catch (error) {
      console.error(error);
    }
  }

  public get Mask() {
    return {
      ...this.mask,
      id: this.id,
      lang: "cn",
      builtin: true,
      createdAt: 0,
    } as Mask;
  }

  public get Id() {
    return this.id;
  }

  public get Name() {
    return this.Mask.name;
  }

  public async Create(prevMessage: ChatMessageX[] = [], trigger = false) {
    // 新建好一个独立的Session
    this.chatStore.newSession(this.Mask);
    this.navigate(Path.Chat);

    // 发送不会触发请求的前置消息
    await this.chatStore.AppendRoleMessageList(
      prevMessage.slice(0, prevMessage.length - 1),
      false,
    );

    // 有可能触发请求的最后一个消息
    const lastMessage = prevMessage[prevMessage.length - 1];

    // 进行前置校验
    const switcher = await this.onBeforeCreate();
    if (switcher) {
      // 以不触发请求的方式发送最后一个消息
      if (lastMessage) {
        await this.chatStore.AppendRoleMessage(lastMessage, false);
      }

      // 以下部分没有Review
      const nextAgent = await this.SwitchAgent(switcher);
      if (nextAgent !== this) {
        return;
      }
      // 上面
    } else {
      if (lastMessage) {
        await this.chatStore.AppendRoleMessage(lastMessage, trigger);
      } else if (trigger) {
        const welcome = this.welcome();
        if (welcome.length > 0) {
          await this.chatStore.AppendRoleMessageList(welcome, false);
        } else {
          await this.chatStore.AppendEmptyMessage();
        }
      }
    }
  }
}
