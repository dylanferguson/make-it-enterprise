import { AbstractBaseModularArithmeticDivisibilityResolutionStrategyMediator } from "../../abstracts/AbstractBaseModularArithmeticDivisibilityResolutionStrategyMediator.js";

export class ConcreteModularArithmeticDivisibilityResolutionStrategyMediatorImpl
  extends AbstractBaseModularArithmeticDivisibilityResolutionStrategyMediator
{
  private static readonly MEDIATOR_VERSION = "1.0.0-CONCRETE-MEDIATOR";

  constructor(mediatorName: string, supportedDivisor: number) {
    super(mediatorName, supportedDivisor, ConcreteModularArithmeticDivisibilityResolutionStrategyMediatorImpl.MEDIATOR_VERSION);
  }

  protected afterMediationHook(value: number, effectiveDivisor: number, result: boolean): void {
    return;
  }
}
