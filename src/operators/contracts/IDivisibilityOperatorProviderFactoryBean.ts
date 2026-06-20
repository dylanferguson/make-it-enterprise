import type { IDivisibilityOperatorProvider } from "./IDivisibilityOperatorProvider.js";

export interface IDivisibilityOperatorProviderFactoryBean {
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  createProvider(): IDivisibilityOperatorProvider;
  destroyProvider(): void;
  isSingleton(): boolean;
}
