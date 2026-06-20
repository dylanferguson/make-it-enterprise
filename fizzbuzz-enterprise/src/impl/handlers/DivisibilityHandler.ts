import { AbstractBaseHandler } from "../../abstracts/AbstractBaseHandler.js";
import type { IFizzBuzzStrategyFactory } from "../../contracts/IFizzBuzzStrategyFactory.js";

export class DivisibilityHandler extends AbstractBaseHandler<number, string> {
  private readonly strategyFactory: IFizzBuzzStrategyFactory;
  private strategies: ReturnType<IFizzBuzzStrategyFactory["createStrategies"]> | null = null;

  constructor(strategyFactory: IFizzBuzzStrategyFactory) {
    super();
    this.strategyFactory = strategyFactory;
  }

  override handle(input: number): string {
    if (this.strategies === null) {
      this.strategies = this.strategyFactory.createStrategies();
    }

    for (const strategy of this.strategies) {
      const result = strategy.evaluate(input);
      if (result !== null) {
        return result;
      }
    }

    return this.handleNext(input);
  }
}
