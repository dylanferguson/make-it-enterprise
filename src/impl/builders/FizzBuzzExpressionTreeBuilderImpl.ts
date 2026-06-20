import { AbstractBaseFizzBuzzExpressionTreeBuilder } from "../../abstracts/AbstractBaseFizzBuzzExpressionTreeBuilder.js";
import type { IFizzBuzzExpression } from "../../contracts/IFizzBuzzExpression.js";
import type { IFizzBuzzRuleDefinition } from "../../contracts/IFizzBuzzRuleDefinition.js";
import type { IFizzBuzzRuleSet } from "../../contracts/IFizzBuzzRuleSet.js";
import { DivisibleByExpressionImpl } from "../expressions/DivisibleByExpressionImpl.js";
import { AndExpressionImpl } from "../expressions/AndExpressionImpl.js";
import { OrExpressionImpl } from "../expressions/OrExpressionImpl.js";
import { NotExpressionImpl } from "../expressions/NotExpressionImpl.js";
import { TrueExpressionImpl } from "../expressions/TrueExpressionImpl.js";
import { FizzBuzzRuleDefinitionImpl } from "../rules/FizzBuzzRuleDefinitionImpl.js";
import { FizzBuzzRuleSetImpl } from "../rules/FizzBuzzRuleSetImpl.js";

export class FizzBuzzExpressionTreeBuilderImpl extends AbstractBaseFizzBuzzExpressionTreeBuilder {
  private static readonly BUILDER_NAME = "FizzBuzzExpressionTreeBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-BUILDER";

  override buildDivisibleByExpression(divisor: number): IFizzBuzzExpression {
    return new DivisibleByExpressionImpl(divisor);
  }

  override buildAndExpression(
    left: IFizzBuzzExpression,
    right: IFizzBuzzExpression,
  ): IFizzBuzzExpression {
    return new AndExpressionImpl(left, right);
  }

  override buildOrExpression(
    left: IFizzBuzzExpression,
    right: IFizzBuzzExpression,
  ): IFizzBuzzExpression {
    return new OrExpressionImpl(left, right);
  }

  override buildNotExpression(inner: IFizzBuzzExpression): IFizzBuzzExpression {
    return new NotExpressionImpl(inner);
  }

  override buildTrueExpression(): IFizzBuzzExpression {
    return new TrueExpressionImpl();
  }

  override buildRuleDefinition(
    ruleName: string,
    expression: IFizzBuzzExpression,
    outputLabel: string,
    priority: number,
  ): IFizzBuzzRuleDefinition {
    return new FizzBuzzRuleDefinitionImpl(ruleName, expression, outputLabel, priority);
  }

  override buildRuleSet(): IFizzBuzzRuleSet {
    return new FizzBuzzRuleSetImpl();
  }

  override getBuilderName(): string {
    return FizzBuzzExpressionTreeBuilderImpl.BUILDER_NAME;
  }

  override getBuilderVersion(): string {
    return FizzBuzzExpressionTreeBuilderImpl.BUILDER_VERSION;
  }
}
