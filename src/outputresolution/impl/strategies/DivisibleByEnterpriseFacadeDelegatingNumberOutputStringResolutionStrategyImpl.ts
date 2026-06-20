import { AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy } from "../../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export class DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy
{
  private static readonly STRATEGY_NAME = "DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-ENTERPRISE-FACADE-DELEGATING";
  private static readonly STRATEGY_PRIORITY = 100;
  private static readonly RESOLVED_IDENTIFIER = "NUMBER_ENTERPRISE_FACADE_DELEGATED";
  private static readonly FIZZ_DIVISOR = 3;
  private static readonly BUZZ_DIVISOR = 5;

  constructor() {
    super(
      DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl.STRATEGY_NAME,
      DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl.STRATEGY_VERSION,
      DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl.STRATEGY_PRIORITY,
      DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(value: number, divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): boolean {
    return !divisibilityFacade.isDivisible(value, DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl.FIZZ_DIVISOR)
      && !divisibilityFacade.isDivisible(value, DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl.BUZZ_DIVISOR);
  }

  override resolve(value: number, _divisibilityFacade: IEnterpriseDivisibilityResolutionFacade): string {
    this.validateResolvableValue(value);
    return value.toString();
  }
}
