import { AbstractBaseModularArithmeticDivisibilityResolutionMediatorFactoryBean } from "../../abstracts/AbstractBaseModularArithmeticDivisibilityResolutionMediatorFactoryBean.js";
import type { IModularArithmeticDivisibilityResolutionStrategyMediator } from "../../contracts/IModularArithmeticDivisibilityResolutionStrategyMediator.js";
import { ConcreteModularArithmeticDivisibilityResolutionStrategyMediatorImpl } from "../mediators/ConcreteModularArithmeticDivisibilityResolutionStrategyMediatorImpl.js";

export class StandardModularArithmeticDivisibilityResolutionMediatorFactoryBeanImpl
  extends AbstractBaseModularArithmeticDivisibilityResolutionMediatorFactoryBean
{
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-STANDARD-MEDIATOR-FACTORY-BEAN";

  constructor(factoryBeanName: string, supportedDivisor: number) {
    super(
      factoryBeanName,
      StandardModularArithmeticDivisibilityResolutionMediatorFactoryBeanImpl.FACTORY_BEAN_VERSION,
      supportedDivisor,
      true,
    );
  }

  override createMediator(): IModularArithmeticDivisibilityResolutionStrategyMediator {
    const divisor = this.getSupportedDivisor();
    const mediator = new ConcreteModularArithmeticDivisibilityResolutionStrategyMediatorImpl(
      `ConcreteModularArithmeticDivisibilityResolutionStrategyMediatorForDivisor${divisor}`,
      divisor,
    );
    return mediator;
  }
}
