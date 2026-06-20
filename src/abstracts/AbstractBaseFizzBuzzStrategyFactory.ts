import type { IFizzBuzzStrategy } from "../contracts/IFizzBuzzStrategy.js";
import type { IFizzBuzzStrategyFactory } from "../contracts/IFizzBuzzStrategyFactory.js";

export abstract class AbstractBaseFizzBuzzStrategyFactory implements IFizzBuzzStrategyFactory {
  abstract createStrategies(): readonly IFizzBuzzStrategy[];

  protected sortByPriority(strategies: readonly IFizzBuzzStrategy[]): readonly IFizzBuzzStrategy[] {
    return [...strategies].sort((a, b) => b.getPriority() - a.getPriority());
  }
}
