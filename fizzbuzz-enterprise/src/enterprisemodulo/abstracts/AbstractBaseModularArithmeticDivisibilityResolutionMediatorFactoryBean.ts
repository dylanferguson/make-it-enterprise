import type { IModularArithmeticDivisibilityResolutionMediatorFactoryBean } from "../contracts/IModularArithmeticDivisibilityResolutionMediatorFactoryBean.js";
import type { IModularArithmeticDivisibilityResolutionStrategyMediator } from "../contracts/IModularArithmeticDivisibilityResolutionStrategyMediator.js";

export abstract class AbstractBaseModularArithmeticDivisibilityResolutionMediatorFactoryBean
  implements IModularArithmeticDivisibilityResolutionMediatorFactoryBean
{
  private readonly factoryBeanName: string;
  private readonly factoryBeanVersion: string;
  private readonly supportedDivisor: number;
  private readonly singleton: boolean;
  private mediatorInstance: IModularArithmeticDivisibilityResolutionStrategyMediator | null = null;

  constructor(
    factoryBeanName: string,
    factoryBeanVersion: string,
    supportedDivisor: number,
    singleton: boolean = true,
  ) {
    this.factoryBeanName = factoryBeanName;
    this.factoryBeanVersion = factoryBeanVersion;
    this.supportedDivisor = supportedDivisor;
    this.singleton = singleton;
  }

  abstract createMediator(): IModularArithmeticDivisibilityResolutionStrategyMediator;

  getFactoryBeanName(): string {
    return this.factoryBeanName;
  }

  getFactoryBeanVersion(): string {
    return this.factoryBeanVersion;
  }

  getSupportedDivisor(): number {
    return this.supportedDivisor;
  }

  isSingleton(): boolean {
    return this.singleton;
  }

  protected getOrCreateMediator(): IModularArithmeticDivisibilityResolutionStrategyMediator {
    if (this.singleton && this.mediatorInstance !== null) {
      return this.mediatorInstance;
    }
    const mediator = this.createMediator();
    if (this.singleton) {
      this.mediatorInstance = mediator;
    }
    return mediator;
  }

  destroyMediator(): void {
    this.mediatorInstance = null;
  }
}
