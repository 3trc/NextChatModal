import { ModelConfig } from "../store";
import { type Mask } from "../store/mask";

export type BuiltinMask = Omit<Mask, "id" | "modelConfig"> & {
  type?: string;
  builtin: Boolean;
  modelConfig: Partial<ModelConfig>;
  userMessageHook?: (message: string, context: any[]) => Promise<any[]>;
  assistantMessageHook?: (message: string, context: any[]) => Promise<any[]>;
};
