import type { IFizzBuzzExpressionTreeBuilder } from "../contracts/IFizzBuzzExpressionTreeBuilder.js";
import type { IFizzBuzzExpression } from "../contracts/IFizzBuzzExpression.js";
import type { IFizzBuzzRuleDefinition } from "../contracts/IFizzBuzzRuleDefinition.js";
import type { IFizzBuzzRuleSet } from "../contracts/IFizzBuzzRuleSet.js";

export abstract class AbstractBaseFizzBuzzExpressionTreeBuilder implements IFizzBuzzExpressionTreeBuilder {
  abstract buildDivisibleByExpression(divisor: number): IFizzBuzzExpression;
  abstract buildAndExpression(left: IFizzBuzzExpression, right: IFizzBuzzExpression): IFizzBuzzExpression;
  abstract buildOrExpression(left: IFizzBuzzExpression, right: IFizzBuzzExpression): IFizzBuzzExpression;
  abstract buildNotExpression(inner: IFizzBuzzExpression): IFizzBuzzExpression;
  abstract buildTrueExpression(): IFizzBuzzExpression;
  abstract buildRuleDefinition(
    ruleName: string,
    expression: IFizzBuzzExpression,
    outputLabel: string,
    priority: number,
  ): IFizzBuzzRuleDefinition;
  abstract buildRuleSet(): IFizzBuzzRuleSet;
  abstract getBuilderName(): string;
  abstract getBuilderVersion(): string;
}
