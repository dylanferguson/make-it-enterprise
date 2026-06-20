import type { IModuloEvaluationStrategyFactoryBean } from "./IModuloEvaluationStrategyFactoryBean.js";

export interface IAbstractDivisibilityStrategyProvider {
  resolveDivisibilityStrategyFactoryBean(
    divisor: number,
    context?: Record<string, unknown>,
  ): IModuloEvaluationStrategyFactoryBean;
  registerDivisibilityStrategyFactoryBean(
    divisor: number,
    factoryBean: IModuloEvaluationStrategyFactoryBean,
  ): void;
  getProviderName(): string;
  getProviderVersion(): string;
  getRegisteredDivisors(): readonly number[];
  getFactoryBeanCount(): number;
}
