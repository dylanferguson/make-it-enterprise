import type { IRemainderComputationStrategyProvider } from "../../contracts/IRemainderComputationStrategyProvider.js";
import type { IRemainderComputationStrategyProviderFactoryBean } from "../../contracts/IRemainderComputationStrategyProviderFactoryBean.js";
import { RemainderComputationStrategyFactoryImpl } from "./RemainderComputationStrategyFactoryImpl.js";

export class RemainderComputationStrategyProviderFactoryBeanImpl
  implements IRemainderComputationStrategyProviderFactoryBean
{
  private static readonly FACTORY_BEAN_NAME = "RemainderComputationStrategyProviderFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-REMAINDER-STRATEGY-PROVIDER-FACTORY-BEAN";

  private readonly isSingletonInstance: boolean;
  private provider: IRemainderComputationStrategyProvider | null = null;

  constructor(isSingleton: boolean = true) {
    this.isSingletonInstance = isSingleton;
  }

  createProvider(): IRemainderComputationStrategyProvider {
    if (this.isSingletonInstance && this.provider !== null) {
      return this.provider;
    }
    const provider = RemainderComputationStrategyFactoryImpl.createProvider();
    if (this.isSingletonInstance) {
      this.provider = provider;
    }
    return provider;
  }

  destroyProvider(): void {
    this.provider = null;
  }

  getFactoryBeanName(): string {
    return RemainderComputationStrategyProviderFactoryBeanImpl.FACTORY_BEAN_NAME;
  }

  getFactoryBeanVersion(): string {
    return RemainderComputationStrategyProviderFactoryBeanImpl.FACTORY_BEAN_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }
}
