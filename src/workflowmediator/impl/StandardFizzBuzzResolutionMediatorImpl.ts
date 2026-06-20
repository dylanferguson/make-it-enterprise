import { AbstractBaseFizzBuzzResolutionMediator } from "../abstracts/AbstractBaseFizzBuzzResolutionMediator.js";

export class StandardFizzBuzzResolutionMediatorImpl extends AbstractBaseFizzBuzzResolutionMediator {
  private static readonly MEDIATOR_NAME = "StandardFizzBuzzResolutionMediator";
  private static readonly MEDIATOR_VERSION = "1.0.0-RESOLUTION-MEDIATOR";
  private static readonly DEFAULT_STRATEGY_NAME = "FallbackStrategy";

  constructor() {
    super(
      StandardFizzBuzzResolutionMediatorImpl.MEDIATOR_NAME,
      StandardFizzBuzzResolutionMediatorImpl.MEDIATOR_VERSION,
    );
  }

  override mediateSingleValueResolution(value: number): string {
    for (const strategyName of this.strategyRegistrationOrder) {
      const strategy = this.strategies.get(strategyName);
      if (strategy !== undefined) {
        const result = strategy(value);
        if (result !== null && result !== undefined) {
          return result;
        }
      }
    }
    const fallback = this.strategies.get(StandardFizzBuzzResolutionMediatorImpl.DEFAULT_STRATEGY_NAME);
    if (fallback !== undefined) {
      return fallback(value);
    }
    throw new Error(
      `[${StandardFizzBuzzResolutionMediatorImpl.MEDIATOR_NAME}] No registered resolution strategy ` +
      `could resolve value=${value} and no fallback strategy is registered`,
    );
  }

  override mediateRangeResolution(start: number, end: number): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.mediateSingleValueResolution(i));
    }
    return results;
  }
}
