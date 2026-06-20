import type { IModuloEvaluationStrategyProvider } from "../contracts/IModuloEvaluationStrategyProvider.js";
import type { IModuloEvaluationStrategyFactoryBean } from "../contracts/IModuloEvaluationStrategyFactoryBean.js";

export abstract class AbstractBaseModuloEvaluationStrategyFactoryBean
  implements IModuloEvaluationStrategyFactoryBean
{
  private readonly factoryBeanName: string;
  private readonly factoryBeanVersion: string;
  private readonly singleton: boolean;
  private providerInstance: IModuloEvaluationStrategyProvider | null = null;

  constructor(
    factoryBeanName: string,
    factoryBeanVersion: string,
    singleton: boolean = true,
  ) {
    this.factoryBeanName = factoryBeanName;
    this.factoryBeanVersion = factoryBeanVersion;
    this.singleton = singleton;
  }

  abstract createProvider(): IModuloEvaluationStrategyProvider;

  getFactoryBeanName(): string {
    return this.factoryBeanName;
  }

  getFactoryBeanVersion(): string {
    return this.factoryBeanVersion;
  }

  isSingleton(): boolean {
    return this.singleton;
  }

  destroyProvider(): void {
    this.providerInstance = null;
  }

  protected getOrCreateProvider(): IModuloEvaluationStrategyProvider {
    if (this.singleton && this.providerInstance !== null) {
      return this.providerInstance;
    }
    const provider = this.createProvider();
    if (this.singleton) {
      this.providerInstance = provider;
    }
    return provider;
  }

  protected logInstantiation(componentName: string): void {
    console.debug(
      `[${this.factoryBeanName}:${this.factoryBeanVersion}] Instantiating ${componentName}`,
    );
  }
}
