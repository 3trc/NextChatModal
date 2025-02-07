import { CUSTOM_MODEL_LIST } from "../constant";
import { BuiltinMask } from "./typing";

export const MASS_MODELS: BuiltinMask[] = [
  ...CUSTOM_MODEL_LIST.map(
    (model) =>
      ({
        avatar: "1f4ad",
        name: model.split("/")[1],
        context: [],
        modelConfig: {
          model: model,
          max_tokens: 20000,
        },
        lang: "cn",
        builtin: true,
        createdAt: 1688899480511,
      }) as BuiltinMask,
  ),
];
