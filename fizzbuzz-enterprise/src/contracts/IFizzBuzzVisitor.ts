import type { IFizzBuzzEvaluationContext } from "./IFizzBuzzEvaluationContext.js";

export interface IFizzBuzzVisitor {
  visitEvaluationContext(context: IFizzBuzzEvaluationContext): void;
  getVisitorType(): string;
}
