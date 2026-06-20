import type { IFizzBuzzExpression } from "./IFizzBuzzExpression.js";

export interface IFizzBuzzRuleDefinition {
  getExpression(): IFizzBuzzExpression;
  getOutputLabel(): string;
  getRulePriority(): number;
  getRuleName(): string;
  isEnabled(): boolean;
}

