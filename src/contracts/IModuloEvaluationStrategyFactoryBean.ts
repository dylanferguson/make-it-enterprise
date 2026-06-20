import type {
  IModuloEvaluationStrategyProvider,
} from "./IModuloEvaluationStrategyProvider.js";

export interface IModuloEvaluationStrategyFactoryBean {
  createProvider(): IModuloEvaluationStrategyProvider;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  isSingleton(): boolean;
  destroyProvider(): void;
}
