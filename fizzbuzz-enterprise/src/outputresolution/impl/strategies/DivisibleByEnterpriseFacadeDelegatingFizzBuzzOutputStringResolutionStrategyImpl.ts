import { AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy } from "../../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export class DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy
{
  private static readonly STRATEGY_NAME = "DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-ENTERPRISE-FACADE-DELEGATING";
  private static readonly STRATEGY_PRIORITY = 10;
  private static readonly RESOLVED_IDENTIFIER = "FIZZBUZZ_ENTERPRISE_FACADE_DELEGATED";
  private static readonly OUTPUT_STRING = "FizzBuzz";
  private static readonly FIZZBUZZ_DIVISOR = 15;

  constructor() {
    super(
      DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.STRATEGY_NAME,
      DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.STRATEGY_VERSION,
      DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.STRATEGY_PRIORITY,
      DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): boolean {
    return divisibilityFacade.isDivisible(
      value,
      DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.FIZZBUZZ_DIVISOR,
    );
  }

  override resolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): string {
    this.validateResolvableValue(value);
    if (!this.canResolve(value, divisibilityFacade)) {
      throw new Error(
        `[${DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.STRATEGY_NAME}] ` +
        `Value ${value} does not satisfy FizzBuzz divisibility constraints delegated to enterprise facade ` +
        `(divisible by ${DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.FIZZBUZZ_DIVISOR})`,
      );
    }
    return DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.OUTPUT_STRING;
  }
}
