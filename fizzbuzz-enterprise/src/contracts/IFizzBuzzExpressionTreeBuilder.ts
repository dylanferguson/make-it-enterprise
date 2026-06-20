import type { IFizzBuzzExpression } from "./IFizzBuzzExpression.js";
import type { IFizzBuzzRuleDefinition } from "./IFizzBuzzRuleDefinition.js";
import type { IFizzBuzzRuleSet } from "./IFizzBuzzRuleSet.js";

export interface IFizzBuzzExpressionTreeBuilder {
  buildDivisibleByExpression(divisor: number): IFizzBuzzExpression;
  buildAndExpression(left: IFizzBuzzExpression, right: IFizzBuzzExpression): IFizzBuzzExpression;
  buildOrExpression(left: IFizzBuzzExpression, right: IFizzBuzzExpression): IFizzBuzzExpression;
  buildNotExpression(inner: IFizzBuzzExpression): IFizzBuzzExpression;
  buildTrueExpression(): IFizzBuzzExpression;
  buildRuleDefinition(
    ruleName: string,
    expression: IFizzBuzzExpression,
    outputLabel: string,
    priority: number,
  ): IFizzBuzzRuleDefinition;
  buildRuleSet(): IFizzBuzzRuleSet;
  getBuilderName(): string;
  getBuilderVersion(): string;
}
