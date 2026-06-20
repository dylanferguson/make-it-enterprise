import type { IEnterpriseFizzBuzzNormalizationContext } from "./IEnterpriseFizzBuzzNormalizationContext.js";

export interface IEnterpriseFizzBuzzOutputNormalizationStage {
  normalize(context: IEnterpriseFizzBuzzNormalizationContext): IEnterpriseFizzBuzzNormalizationContext;
  getStageName(): string;
  getStagePriority(): number;
  setNext(stage: IEnterpriseFizzBuzzOutputNormalizationStage): IEnterpriseFizzBuzzOutputNormalizationStage;
}
