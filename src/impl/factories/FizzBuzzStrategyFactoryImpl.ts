import { AbstractBaseFizzBuzzStrategyFactory } from "../../abstracts/AbstractBaseFizzBuzzStrategyFactory.js";
import type { IFizzBuzzStrategy } from "../../contracts/IFizzBuzzStrategy.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import type { IFizzBuzzExpressionEvaluator } from "../../contracts/IFizzBuzzExpressionEvaluator.js";
import { FizzBuzzDivisibleByFifteenStrategy } from "../strategies/FizzBuzzDivisibleByFifteenStrategy.js";
import { FizzBuzzDivisibleByThreeStrategy } from "../strategies/FizzBuzzDivisibleByThreeStrategy.js";
import { FizzBuzzDivisibleByFiveStrategy } from "../strategies/FizzBuzzDivisibleByFiveStrategy.js";
import { FizzBuzzDefaultValueStrategy } from "../strategies/FizzBuzzDefaultValueStrategy.js";
import { ExpressionFilteringFizzBuzzStrategyDecorator } from "../decorators/ExpressionFilteringFizzBuzzStrategyDecorator.js";

export class FizzBuzzStrategyFactoryImpl extends AbstractBaseFizzBuzzStrategyFactory {
  private readonly visitor: IFizzBuzzVisitor;
  private readonly formatter: IFizzBuzzOutputFormatter;
  private expressionEvaluator: IFizzBuzzExpressionEvaluator | null = null;

  constructor(visitor: IFizzBuzzVisitor, formatter: IFizzBuzzOutputFormatter) {
    super();
    this.visitor = visitor;
    this.formatter = formatter;
  }

  setExpressionEvaluator(evaluator: IFizzBuzzExpressionEvaluator | null): void {
    this.expressionEvaluator = evaluator;
  }

  getExpressionEvaluator(): IFizzBuzzExpressionEvaluator | null {
    return this.expressionEvaluator;
  }

  override createStrategies(): readonly IFizzBuzzStrategy[] {
    const rawStrategies: IFizzBuzzStrategy[] = [
      new FizzBuzzDivisibleByFifteenStrategy(this.visitor, this.formatter),
      new FizzBuzzDivisibleByThreeStrategy(this.visitor, this.formatter),
      new FizzBuzzDivisibleByFiveStrategy(this.visitor, this.formatter),
      new FizzBuzzDefaultValueStrategy(this.visitor, this.formatter),
    ];
    for (const strategy of rawStrategies) {
      this.applyCrossCuttingConcerns(strategy);
    }
    const sorted = this.sortByPriority(rawStrategies);
    if (this.expressionEvaluator !== null) {
      return sorted.map(
        (s) => new ExpressionFilteringFizzBuzzStrategyDecorator(s, this.expressionEvaluator!),
      );
    }
    return sorted;
  }
}
