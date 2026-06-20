import type { IModularArithmeticDivisibilityResolutionStrategyMediator } from "../contracts/IModularArithmeticDivisibilityResolutionStrategyMediator.js";
import { StandardRemainderBasedDivisibilityOperatorImpl } from "../../operators/impl/operators/StandardRemainderBasedDivisibilityOperatorImpl.js";

export abstract class AbstractBaseModularArithmeticDivisibilityResolutionStrategyMediator
  implements IModularArithmeticDivisibilityResolutionStrategyMediator
{
  private static readonly DEFAULT_MEDIATOR_VERSION = "1.0.0-BASE-MEDIATOR";

  private readonly mediatorName: string;
  private readonly mediatorVersion: string;
  private readonly supportedDivisor: number;
  private readonly divisibilityOperator: StandardRemainderBasedDivisibilityOperatorImpl;
  private mediationCount: number = 0;

  constructor(
    mediatorName: string,
    supportedDivisor: number,
    mediatorVersion: string = AbstractBaseModularArithmeticDivisibilityResolutionStrategyMediator.DEFAULT_MEDIATOR_VERSION,
  ) {
    this.mediatorName = mediatorName;
    this.mediatorVersion = mediatorVersion;
    this.supportedDivisor = supportedDivisor;
    this.divisibilityOperator = new StandardRemainderBasedDivisibilityOperatorImpl();
  }

  getMediatorName(): string {
    return this.mediatorName;
  }

  getMediatorVersion(): string {
    return this.mediatorVersion;
  }

  getSupportedDivisor(): number {
    return this.supportedDivisor;
  }

  getMediationCount(): number {
    return this.mediationCount;
  }

  isDivisibleBy(value: number): boolean {
    this.mediationCount++;
    const divisor = this.resolveEffectiveDivisor();
    const result = this.divisibilityOperator.isDivisibleBy(value, divisor);
    this.afterMediationHook(value, divisor, result);
    return result;
  }

  protected resolveEffectiveDivisor(): number {
    return this.supportedDivisor;
  }

  protected abstract afterMediationHook(
    value: number,
    effectiveDivisor: number,
    result: boolean,
  ): void;
}
