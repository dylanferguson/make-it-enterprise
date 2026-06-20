import type { IComputationStrategySelectorStrategy } from "./IComputationStrategySelectorStrategy.js";

export interface IEnterpriseComputationStrategySelectorStrategyFactoryBean {
  createSelectorStrategy(): IComputationStrategySelectorStrategy;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
}

export interface IEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory {
  createSelectorStrategy(): IComputationStrategySelectorStrategy;
  getFactoryName(): string;
  getFactoryPriority(): number;
}
