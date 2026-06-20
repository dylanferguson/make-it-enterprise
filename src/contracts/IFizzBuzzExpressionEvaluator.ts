import type { IFizzBuzzRuleSet } from "./IFizzBuzzRuleSet.js";
import type { IFizzBuzzOutputFormatter } from "./IFizzBuzzOutputFormatter.js";

export interface IFizzBuzzExpressionEvaluator {
  evaluate(value: number): string | null;
  getRuleSet(): IFizzBuzzRuleSet;
  getEvaluatorName(): string;
  getEvaluatorVersion(): string;
  setOutputFormatter(formatter: IFizzBuzzOutputFormatter): void;
}

