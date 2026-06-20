import { AbstractBaseFizzBuzzStrategyFactory } from "../../abstracts/AbstractBaseFizzBuzzStrategyFactory.js";
import type { IFizzBuzzStrategy } from "../../contracts/IFizzBuzzStrategy.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import { FizzBuzzDivisibleByFifteenStrategy } from "../strategies/FizzBuzzDivisibleByFifteenStrategy.js";
import { FizzBuzzDivisibleByThreeStrategy } from "../strategies/FizzBuzzDivisibleByThreeStrategy.js";
import { FizzBuzzDivisibleByFiveStrategy } from "../strategies/FizzBuzzDivisibleByFiveStrategy.js";
import { FizzBuzzDefaultValueStrategy } from "../strategies/FizzBuzzDefaultValueStrategy.js";

export class FizzBuzzStrategyFactoryImpl extends AbstractBaseFizzBuzzStrategyFactory {
  private readonly evaluator: IDivisibilityEvaluator;
  private readonly formatter: IFizzBuzzOutputFormatter;

  constructor(evaluator: IDivisibilityEvaluator, formatter: IFizzBuzzOutputFormatter) {
    super();
    this.evaluator = evaluator;
    this.formatter = formatter;
  }

  override createStrategies(): readonly IFizzBuzzStrategy[] {
    const strategies: readonly IFizzBuzzStrategy[] = [
      new FizzBuzzDivisibleByFifteenStrategy(this.evaluator, this.formatter),
      new FizzBuzzDivisibleByThreeStrategy(this.evaluator, this.formatter),
      new FizzBuzzDivisibleByFiveStrategy(this.evaluator, this.formatter),
      new FizzBuzzDefaultValueStrategy(this.evaluator, this.formatter),
    ];
    return this.sortByPriority(strategies);
  }
}
