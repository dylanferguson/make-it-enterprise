import { AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy } from "../../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export class DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy
{
  private static readonly STRATEGY_NAME = "DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-ENTERPRISE-FACADE-DELEGATING";
  private static readonly STRATEGY_PRIORITY = 20;
  private static readonly RESOLVED_IDENTIFIER = "FIZZ_ENTERPRISE_FACADE_DELEGATED";
  private static readonly OUTPUT_STRING = "Fizz";
  private static readonly FIZZ_DIVISOR = 3;
  private static readonly BUZZ_DIVISOR = 5;

  constructor() {
    super(
      DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.STRATEGY_NAME,
      DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.STRATEGY_VERSION,
      DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.STRATEGY_PRIORITY,
      DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): boolean {
    return divisibilityFacade.isDivisible(value, DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.FIZZ_DIVISOR)
      && !divisibilityFacade.isDivisible(value, DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.BUZZ_DIVISOR);
  }

  override resolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): string {
    this.validateResolvableValue(value);
    if (!this.canResolve(value, divisibilityFacade)) {
      throw new Error(
        `[${DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.STRATEGY_NAME}] ` +
        `Value ${value} does not satisfy Fizz divisibility constraints delegated to enterprise facade ` +
        `(divisible by ${DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.FIZZ_DIVISOR} but not ` +
        `${DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.BUZZ_DIVISOR})`,
      );
    }
    return DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.OUTPUT_STRING;
  }
}
