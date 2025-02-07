import { BuiltinMask } from "./typing";

export const XSEA_AGENTS: BuiltinMask[] = [
  {
    avatar: "1f4da",
    name: "XSea知识库",
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
