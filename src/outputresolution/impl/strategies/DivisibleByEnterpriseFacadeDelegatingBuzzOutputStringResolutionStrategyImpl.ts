import { AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy } from "../../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export class DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy
{
  private static readonly STRATEGY_NAME = "DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-ENTERPRISE-FACADE-DELEGATING";
  private static readonly STRATEGY_PRIORITY = 30;
  private static readonly RESOLVED_IDENTIFIER = "BUZZ_ENTERPRISE_FACADE_DELEGATED";
  private static readonly OUTPUT_STRING = "Buzz";
  private static readonly FIZZ_DIVISOR = 3;
  private static readonly BUZZ_DIVISOR = 5;

  constructor() {
    super(
      DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.STRATEGY_NAME,
      DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.STRATEGY_VERSION,
      DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.STRATEGY_PRIORITY,
      DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): boolean {
    return !divisibilityFacade.isDivisible(value, DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.FIZZ_DIVISOR)
      && divisibilityFacade.isDivisible(value, DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.BUZZ_DIVISOR);
  }

  override resolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): string {
    this.validateResolvableValue(value);
    if (!this.canResolve(value, divisibilityFacade)) {
      throw new Error(
        `[${DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.STRATEGY_NAME}] ` +
        `Value ${value} does not satisfy Buzz divisibility constraints delegated to enterprise facade ` +
        `(divisible by ${DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.BUZZ_DIVISOR} but not ` +
        `${DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.FIZZ_DIVISOR})`,
      );
    }
    return DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.OUTPUT_STRING;
  }
}
