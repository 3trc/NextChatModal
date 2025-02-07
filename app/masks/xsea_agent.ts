import { XSEA_Knowledge } from "./knowledge/xsea";
import { BuiltinMask } from "./typing";

export const XSEA_AGENTS: BuiltinMask[] = [
  {
    avatar: "📚",
    name: "XSea-知识库",
    context: [
      {
        id: "",
        role: "system",
        content:
          "XSea性能测试平台是一个强大的用于性能测试的软件系统，你是准确了解XSea性能测试平台各种知识的AI助手。接下来我会发送给你XSea性能测试平台的相关文档，你需要以此为基础回答用户操作流程，知识概念，常见问题等等方面的问题。",
        date: "",
      },
      {
        id: "",
        role: "system",
        content: XSEA_Knowledge,
        date: "",
      },
      {
        id: "",
        role: "system",
        content:
          "对于你不会的问题，你就说不知道。对于用户表达含糊或者你不是很确定的问题，请寻求澄清。回答问题一定要结合上述产品知识库以及压力测试的行业技术背景知识。聊天中一定要避免透露你是在引用知识库文档，你需要像是一个真的助手一样回答问题。对于非XSea性能测试平台或者非测试相关的问题，请一定不要回答。",
        date: "",
      },
    ],
    modelConfig: {
      model: "mistralai/mistral-small-24b-instruct-2501",
      max_tokens: 32768,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
    hideContext: true,
  },
  {
    avatar: "🔄",
    name: "压测-Agent",
    context: [
      {
        id: "",
        role: "user",
        content: "你好",
        date: "",
      },
    ],
    modelConfig: {
      model: "mistralai/mistral-small-24b-instruct-2501",
      max_tokens: 32768,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
  {
    avatar: "🔄",
    name: "创建脚本-Agent",
    context: [
      {
        id: "",
        role: "user",
        content: "你好",
        date: "",
      },
    ],
    modelConfig: {
      model: "mistralai/mistral-small-24b-instruct-2501",
      max_tokens: 32768,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
  {
    avatar: "🔄",
    name: "创建目标-Agent",
    context: [
      {
        id: "",
        role: "user",
        content: "你好",
        date: "",
      },
    ],
    modelConfig: {
      model: "mistralai/mistral-small-24b-instruct-2501",
      max_tokens: 32768,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
  {
    avatar: "🔄",
    name: "产品列表-Agent",
    context: [
      {
        id: "",
        role: "user",
        content: "你好",
        date: "",
      },
    ],
    modelConfig: {
      model: "mistralai/mistral-small-24b-instruct-2501",
      max_tokens: 32768,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
  {
    avatar: "🔄",
    name: "计划列表-Agent",
    context: [
      {
        id: "",
        role: "user",
        content: "你好",
        date: "",
      },
    ],
    modelConfig: {
      model: "mistralai/mistral-small-24b-instruct-2501",
      max_tokens: 32768,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
  {
    avatar: "🔄",
    name: "脚本列表-Agent",
    context: [
      {
        id: "",
        role: "user",
        content: "你好",
        date: "",
      },
    ],
    modelConfig: {
      model: "mistralai/mistral-small-24b-instruct-2501",
      max_tokens: 32768,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
  {
    avatar: "🔄",
    name: "目标列表-Agent",
    context: [
      {
        id: "",
        role: "user",
        content: "你好",
        date: "",
      },
    ],
    modelConfig: {
      model: "mistralai/mistral-small-24b-instruct-2501",
      max_tokens: 32768,
    },
    lang: "cn",
    builtin: true,
    createdAt: 1688899480511,
  },
];
