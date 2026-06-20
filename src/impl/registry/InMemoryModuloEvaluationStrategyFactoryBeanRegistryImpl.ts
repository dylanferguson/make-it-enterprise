import { AbstractBaseModuloEvaluationStrategyFactoryBeanRegistry } from "../../abstracts/AbstractBaseModuloEvaluationStrategyFactoryBeanRegistry.js";

export class InMemoryModuloEvaluationStrategyFactoryBeanRegistryImpl
  extends AbstractBaseModuloEvaluationStrategyFactoryBeanRegistry
{
  private static readonly REGISTRY_NAME = "InMemoryModuloEvaluationStrategyFactoryBeanRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-REGISTRY";

  override registerFactoryBean(divisor: number, factoryBeanName: string): void {
    this.assertDivisorNotRegistered(divisor);
    this.beanRegistry.set(divisor, factoryBeanName);
    console.debug(
      `[${this.getRegistryName()}] Registered factory bean [${factoryBeanName}] for divisor=${divisor}`,
    );
  }

  override getRegistryName(): string {
    return InMemoryModuloEvaluationStrategyFactoryBeanRegistryImpl.REGISTRY_NAME;
  }

  override getRegistryVersion(): string {
    return InMemoryModuloEvaluationStrategyFactoryBeanRegistryImpl.REGISTRY_VERSION;
  }
}
