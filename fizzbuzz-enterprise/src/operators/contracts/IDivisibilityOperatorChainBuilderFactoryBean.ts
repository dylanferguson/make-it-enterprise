import type { IDivisibilityOperatorChainBuilder } from "./IDivisibilityOperatorChainBuilder.js";

export interface IDivisibilityOperatorChainBuilderFactoryBean {
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  createBuilder(): IDivisibilityOperatorChainBuilder;
  destroyBuilder(): void;
  isSingleton(): boolean;
}
