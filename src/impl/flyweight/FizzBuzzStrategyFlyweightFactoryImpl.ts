import { AbstractBaseFizzBuzzStrategyFlyweightFactory } from "../../abstracts/AbstractBaseFizzBuzzStrategyFlyweightFactory.js";
import type { IFizzBuzzStrategy } from "../../contracts/IFizzBuzzStrategy.js";

export class FizzBuzzStrategyFlyweightFactoryImpl extends AbstractBaseFizzBuzzStrategyFlyweightFactory {
  private static readonly FACTORY_NAME = "FizzBuzzStrategyFlyweightFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FLYWEIGHT";

  constructor() {
    super(FizzBuzzStrategyFlyweightFactoryImpl.FACTORY_NAME);
  }

  override getFlyweightFactoryName(): string {
    return FizzBuzzStrategyFlyweightFactoryImpl.FACTORY_NAME;
  }

  getFactoryVersion(): string {
    return FizzBuzzStrategyFlyweightFactoryImpl.FACTORY_VERSION;
  }

  preloadStrategies(strategies: Map<string, IFizzBuzzStrategy>): void {
    for (const [key, strategy] of strategies) {
      this.registerStrategy(key, strategy);
    }
    console.debug(
      `[${this.getFlyweightFactoryName()}] Preloaded ${strategies.size} strategies into flyweight cache`,
    );
  }
}
