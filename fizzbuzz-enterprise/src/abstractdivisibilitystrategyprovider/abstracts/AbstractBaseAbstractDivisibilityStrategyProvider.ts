import type { IAbstractDivisibilityStrategyProvider } from "../contracts/IAbstractDivisibilityStrategyProvider.js";
import type { IModuloEvaluationStrategyFactoryBean } from "../contracts/IModuloEvaluationStrategyFactoryBean.js";

export abstract class AbstractBaseAbstractDivisibilityStrategyProvider
  implements IAbstractDivisibilityStrategyProvider
{
  protected abstract readonly providerName: string;
  protected abstract readonly providerVersion: string;

  abstract resolveDivisibilityStrategyFactoryBean(
    divisor: number,
    context?: Record<string, unknown>,
  ): IModuloEvaluationStrategyFactoryBean;

  abstract registerDivisibilityStrategyFactoryBean(
    divisor: number,
    factoryBean: IModuloEvaluationStrategyFactoryBean,
  ): void;

  abstract getRegisteredDivisors(): readonly number[];
  abstract getFactoryBeanCount(): number;

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }
}
