import type { IFizzBuzzStrategy } from "../../contracts/IFizzBuzzStrategy.js";
import type { IFizzBuzzStrategyDecorator } from "../../contracts/IFizzBuzzStrategyDecorator.js";
import type { IFizzBuzzExpressionEvaluator } from "../../contracts/IFizzBuzzExpressionEvaluator.js";

export class ExpressionFilteringFizzBuzzStrategyDecorator implements IFizzBuzzStrategyDecorator {
  private static readonly DECORATOR_NAME = "ExpressionFilteringFizzBuzzStrategyDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-ENTERPRISE";

  private readonly decoratedStrategy: IFizzBuzzStrategy;
  private readonly expressionEvaluator: IFizzBuzzExpressionEvaluator;

  constructor(
    decoratedStrategy: IFizzBuzzStrategy,
    expressionEvaluator: IFizzBuzzExpressionEvaluator,
  ) {
    this.decoratedStrategy = decoratedStrategy;
    this.expressionEvaluator = expressionEvaluator;
  }

  getDecoratedStrategy(): IFizzBuzzStrategy {
    return this.decoratedStrategy;
  }

  getDecoratorName(): string {
    return ExpressionFilteringFizzBuzzStrategyDecorator.DECORATOR_NAME;
  }

  getDecoratorVersion(): string {
    return ExpressionFilteringFizzBuzzStrategyDecorator.DECORATOR_VERSION;
  }

  evaluate(value: number): string | null {
    const expressionResult = this.expressionEvaluator.evaluate(value);
    if (expressionResult !== null) {
      return expressionResult;
    }
    return this.decoratedStrategy.evaluate(value);
  }

  getPriority(): number {
    return this.decoratedStrategy.getPriority();
  }
}

