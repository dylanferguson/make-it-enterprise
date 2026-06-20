import { AbstractBaseFizzBuzzStrategyFactory } from "../../abstracts/AbstractBaseFizzBuzzStrategyFactory.js";
import type { IFizzBuzzStrategy } from "../../contracts/IFizzBuzzStrategy.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";
import { FizzBuzzDivisibleByFifteenStrategy } from "../strategies/FizzBuzzDivisibleByFifteenStrategy.js";
import { FizzBuzzDivisibleByThreeStrategy } from "../strategies/FizzBuzzDivisibleByThreeStrategy.js";
import { FizzBuzzDivisibleByFiveStrategy } from "../strategies/FizzBuzzDivisibleByFiveStrategy.js";
import { FizzBuzzDefaultValueStrategy } from "../strategies/FizzBuzzDefaultValueStrategy.js";

export class FizzBuzzStrategyFactoryImpl extends AbstractBaseFizzBuzzStrategyFactory {
  private readonly visitor: IFizzBuzzVisitor;
  private readonly formatter: IFizzBuzzOutputFormatter;

  constructor(visitor: IFizzBuzzVisitor, formatter: IFizzBuzzOutputFormatter) {
    super();
    this.visitor = visitor;
    this.formatter = formatter;
  }

  override createStrategies(): readonly IFizzBuzzStrategy[] {
    const strategies: readonly IFizzBuzzStrategy[] = [
      new FizzBuzzDivisibleByFifteenStrategy(this.visitor, this.formatter),
      new FizzBuzzDivisibleByThreeStrategy(this.visitor, this.formatter),
      new FizzBuzzDivisibleByFiveStrategy(this.visitor, this.formatter),
      new FizzBuzzDefaultValueStrategy(this.visitor, this.formatter),
    ];
    return this.sortByPriority(strategies);
  }
}
