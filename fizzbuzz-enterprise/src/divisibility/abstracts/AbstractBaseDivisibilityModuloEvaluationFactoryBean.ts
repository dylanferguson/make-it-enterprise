import type { IDivisibilityModuloEvaluationFactoryBean } from "../contracts/IDivisibilityModuloEvaluationFactoryBean.js";
import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";

export abstract class AbstractBaseDivisibilityModuloEvaluationFactoryBean
  implements IDivisibilityModuloEvaluationFactoryBean
{
  private readonly factoryBeanName: string;
  private readonly factoryBeanVersion: string;
  private readonly singleton: boolean;
  private readonly supportedDivisor: number;

  constructor(
    factoryBeanName: string,
    factoryBeanVersion: string,
    singleton: boolean,
    supportedDivisor: number,
  ) {
    this.factoryBeanName = factoryBeanName;
    this.factoryBeanVersion = factoryBeanVersion;
    this.singleton = singleton;
    this.supportedDivisor = supportedDivisor;
  }

  getFactoryBeanName(): string {
    return this.factoryBeanName;
  }

  getFactoryBeanVersion(): string {
    return this.factoryBeanVersion;
  }

  isSingleton(): boolean {
    return this.singleton;
  }

  getSupportedDivisor(): number {
    return this.supportedDivisor;
  }

  abstract createChainHandler(): IDivisibilityModuloEvaluationChainHandler;

  protected logInstantiation(productType: string): void {
    console.debug(
      `[${this.factoryBeanName} v${this.factoryBeanVersion}] ` +
      `Instantiating ${productType} for divisor=${this.supportedDivisor}`,
    );
  }
}
