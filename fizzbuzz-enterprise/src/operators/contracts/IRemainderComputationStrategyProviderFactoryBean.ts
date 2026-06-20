import type { IRemainderComputationStrategyProvider } from "./IRemainderComputationStrategyProvider.js";

export interface IRemainderComputationStrategyProviderFactoryBean {
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  createProvider(): IRemainderComputationStrategyProvider;
  destroyProvider(): void;
  isSingleton(): boolean;
}
