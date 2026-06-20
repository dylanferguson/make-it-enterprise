import { AbstractBaseAbstractDivisibilityStrategyProvider } from "../abstracts/AbstractBaseAbstractDivisibilityStrategyProvider.js";
import type { IModuloEvaluationStrategyFactoryBean } from "../contracts/IModuloEvaluationStrategyFactoryBean.js";

export class AbstractDivisibilityStrategyProviderImpl
  extends AbstractBaseAbstractDivisibilityStrategyProvider
{
  protected readonly providerName = "AbstractDivisibilityStrategyProvider";
  protected readonly providerVersion = "1.0.0-DSRP-ENTERPRISE";

  private readonly factoryBeanRegistry: Map<number, IModuloEvaluationStrategyFactoryBean> = new Map();

  resolveDivisibilityStrategyFactoryBean(
    divisor: number,
    context?: Record<string, unknown>,
  ): IModuloEvaluationStrategyFactoryBean {
    const factoryBean = this.factoryBeanRegistry.get(divisor);
    if (factoryBean !== undefined) {
      return factoryBean;
    }
    throw new Error(
      `[${this.providerName}:${this.providerVersion}] ` +
      `No ModuloEvaluationStrategyFactoryBean registered for divisor=[${divisor}] ` +
      `context=[${JSON.stringify(context ?? {})}] ` +
      `registeredDivisors=[${Array.from(this.factoryBeanRegistry.keys()).join(", ")}]`,
    );
  }

  registerDivisibilityStrategyFactoryBean(
    divisor: number,
    factoryBean: IModuloEvaluationStrategyFactoryBean,
  ): void {
    const existing = this.factoryBeanRegistry.get(divisor);
    if (existing !== undefined) {
      console.debug(
        `[${this.providerName}:${this.providerVersion}] ` +
        `Overriding existing factory bean for divisor=[${divisor}]: ` +
        `old=[${existing.getFactoryBeanName()}], new=[${factoryBean.getFactoryBeanName()}]`,
      );
    }
    this.factoryBeanRegistry.set(divisor, factoryBean);
  }

  getRegisteredDivisors(): readonly number[] {
    return Array.from(this.factoryBeanRegistry.keys());
  }

  getFactoryBeanCount(): number {
    return this.factoryBeanRegistry.size;
  }
}
