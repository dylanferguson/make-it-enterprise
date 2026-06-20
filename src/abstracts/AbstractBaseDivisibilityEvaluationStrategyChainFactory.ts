import type { IDivisibilityEvaluationStrategyChainFactory } from "../contracts/IDivisibilityEvaluationStrategyChainFactory.js";
import type { IDivisibilityEvaluationStrategyChain } from "../contracts/IDivisibilityEvaluationStrategyChain.js";

export abstract class AbstractBaseDivisibilityEvaluationStrategyChainFactory
  implements IDivisibilityEvaluationStrategyChainFactory
{
  protected static readonly DEFAULT_FACTORY_BEAN_NAME = "AbstractBaseDivisibilityEvaluationStrategyChainFactory";
  protected static readonly DEFAULT_FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN";

  private readonly factoryBeanName: string;
  private readonly factoryBeanVersion: string;
  private readonly singleton: boolean;
  private chainInstance: IDivisibilityEvaluationStrategyChain | null = null;

  constructor(
    factoryBeanName: string = AbstractBaseDivisibilityEvaluationStrategyChainFactory.DEFAULT_FACTORY_BEAN_NAME,
    factoryBeanVersion: string = AbstractBaseDivisibilityEvaluationStrategyChainFactory.DEFAULT_FACTORY_BEAN_VERSION,
    singleton: boolean = true,
  ) {
    this.factoryBeanName = factoryBeanName;
    this.factoryBeanVersion = factoryBeanVersion;
    this.singleton = singleton;
  }

  abstract createChain(): IDivisibilityEvaluationStrategyChain;

  getFactoryBeanName(): string {
    return this.factoryBeanName;
  }

  getFactoryBeanVersion(): string {
    return this.factoryBeanVersion;
  }

  isSingleton(): boolean {
    return this.singleton;
  }

  destroyChain(): void {
    this.chainInstance = null;
  }

  protected getOrCreateChain(): IDivisibilityEvaluationStrategyChain {
    if (this.singleton && this.chainInstance !== null) {
      return this.chainInstance;
    }
    const chain = this.createChain();
    if (this.singleton) {
      this.chainInstance = chain;
    }
    return chain;
  }

  protected logInstantiation(componentName: string): void {
    console.debug(
      `[${this.factoryBeanName}] Instantiating ${componentName} via ${this.factoryBeanVersion}`,
    );
  }
}
