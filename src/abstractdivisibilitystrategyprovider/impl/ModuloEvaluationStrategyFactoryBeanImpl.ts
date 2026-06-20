import { AbstractBaseModuloEvaluationStrategyFactoryBean } from "../abstracts/AbstractBaseModuloEvaluationStrategyFactoryBean.js";
import type { IDivisibilityStrategyChainOfResponsibilityHandler } from "../contracts/IDivisibilityStrategyChainOfResponsibilityHandler.js";
import { DivisibilityStrategyChainOfResponsibilityHandlerImpl } from "./DivisibilityStrategyChainOfResponsibilityHandlerImpl.js";

export class ModuloEvaluationStrategyFactoryBeanImpl
  extends AbstractBaseModuloEvaluationStrategyFactoryBean
{
  protected readonly divisor: number;
  protected readonly factoryBeanName: string;
  protected readonly factoryBeanVersion: string;
  protected readonly evaluationCachingEnabled: boolean;

  constructor(divisor: number, cacheEnabled: boolean = true) {
    super();
    this.divisor = divisor;
    this.evaluationCachingEnabled = cacheEnabled;
    this.factoryBeanName = `ModuloEvaluationStrategyFactoryBean[divisor=${divisor}]`;
    this.factoryBeanVersion = `1.0.0-MESFB-DIVISOR-${this.divisor}`;
  }

  createChainHandler(): IDivisibilityStrategyChainOfResponsibilityHandler {
    return new DivisibilityStrategyChainOfResponsibilityHandlerImpl(
      `ChainHandlerForDivisor${this.divisor}`,
      `1.0.0-CH-${this.divisor}`,
      this.divisor,
    );
  }
}
