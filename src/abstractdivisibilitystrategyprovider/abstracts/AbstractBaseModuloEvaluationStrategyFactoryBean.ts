import type { IModuloEvaluationStrategyFactoryBean } from "../contracts/IModuloEvaluationStrategyFactoryBean.js";
import type { IDivisibilityStrategyChainOfResponsibilityHandler } from "../contracts/IDivisibilityStrategyChainOfResponsibilityHandler.js";

export abstract class AbstractBaseModuloEvaluationStrategyFactoryBean
  implements IModuloEvaluationStrategyFactoryBean
{
  protected abstract readonly divisor: number;
  protected abstract readonly factoryBeanName: string;
  protected abstract readonly factoryBeanVersion: string;
  protected abstract readonly evaluationCachingEnabled: boolean;

  abstract createChainHandler(): IDivisibilityStrategyChainOfResponsibilityHandler;

  getDivisor(): number {
    return this.divisor;
  }

  getFactoryBeanName(): string {
    return this.factoryBeanName;
  }

  getFactoryBeanVersion(): string {
    return this.factoryBeanVersion;
  }

  isEvaluationCachingEnabled(): boolean {
    return this.evaluationCachingEnabled;
  }
}
