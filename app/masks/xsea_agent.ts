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
    name: "产品-Agent",
    context: [
      {
        id: "",
        role: "system",
        content:
          "XSea是一个性能测试平台，这个产品可以让用户在平台上编辑 JMeter，Gatling，Shell，SeaMeter[一种平台独有的低代码压测脚本] 四种压测脚本。\n" +
          "最顶层的模块是【产品】，【产品】下面有【脚本】和【计划】等模块\n" +
          "【脚本】模块在界面左侧有一个文件夹组织的脚本树，右侧是脚本编辑器区域。用户可以在此管理或编写上述四种压测脚本\n" +
          "【计划】下面有【目标】【压测记录】【压测报告】等模块\n" +
          "【目标】模块的左侧为一个列表，选择列表内某一个压测目标之后，右侧界面上显示更换此目标的绑定的压测脚本[父级【产品】下面的脚本]，配置压测流量曲线等等常用能力，在页面右上角有【执行】按钮，点击即可执行压测\n" +
          "每一次目标执行，页面会跳转到【压测执行监控】页面。【目标】执行结束之后会在父级【计划】模块下的【压测记录】模块，生成一条压测记录\n" +
          "【压测记录】模块是压测记录列表，如上所述【目标】执行完成之后会在同属的【产品】下面生成一条压测记录，点击某一行可以打开【压测记录详情】页面\n" +
          "【压测报告】模块是压测报告列表，用户需要自己选择同属【计划】下的相关压测记录和其他相关信息来手动创建压测报告\n\n" +
          "大致结构如下：\n【产品】 -> 【脚本】\n【产品】-> 【计划】-> 【目标】\n【产品】-> 【计划】-> 【压测记录】\n【产品】-> 【计划】-> 【压测报告】\n\n" +
          "大致关系如下：\n【脚本】必须创建在某一个【产品】下面\n【计划】必须创建在某一个【产品】下面\n【目标】必须创建在某一个【计划】下面\n创建【目标】必须关联一个或多个同【产品】下的【脚本】\n【目标】执行结束产生【压测记录】\n用户选择多个【压测记录】并且自己编辑一些相关信息产生【压测报告】\n\n" +
          "从零开始进行一次压测的流程如下：\n1.创建一个【产品】2.在产品下面创建若干【脚本】3.在产品下面创建一个【计划】4.在计划下面创建一个【目标】并且绑定若干【脚本】5.执行【目标】6.等待目标执行结束，查看对应的【压测记录】\n\n" +
          "从零开始创建脚本的流程如下：\n1.创建一个【产品】2.在产品下面创建一个【脚本】3.编写脚本并且点击调试按钮调试脚本，如果符合预期的话，那么此脚本即可被压测流程中的【目标】使用\n\n" +
          "以上是有关于XSea性能测试平台的概括知识，你需要以此为背景回答用户问题，并且避免透露引用知识库\n\n" +
          "接下来我会告诉你在XSea性能测试平台里面具体需要帮助用户的细分工作和承担的角色",
        date: "",
      },
      {
        id: "",
        role: "system",
        content:
          "你是XSea性能测试平台之中的产品小助手，你可以帮助用户 1.创建一个新的产品 2.查看现有的产品列表 3.解释或者总结用户对于产品的疑问。对于非XSea性能测试平台之中的【产品】的相关问题，你不需要回答。",
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
