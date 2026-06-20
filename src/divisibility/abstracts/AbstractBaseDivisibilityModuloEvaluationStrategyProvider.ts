import type { IDivisibilityModuloEvaluationStrategyProvider } from "../contracts/IDivisibilityModuloEvaluationStrategyProvider.js";
import type { IDivisibilityModuloEvaluationFactoryBean } from "../contracts/IDivisibilityModuloEvaluationFactoryBean.js";
import type { IDivisibilityModuloEvaluationChainHandler } from "../contracts/IDivisibilityModuloEvaluationChainHandler.js";
import type { IDivisibilityModuloEvaluationFactoryBeanRegistry } from "../factories/IDivisibilityModuloEvaluationFactoryBeanRegistry.js";

export abstract class AbstractBaseDivisibilityModuloEvaluationStrategyProvider
  implements IDivisibilityModuloEvaluationStrategyProvider
{
  private readonly providerName: string;
  private readonly providerVersion: string;
  protected registry: IDivisibilityModuloEvaluationFactoryBeanRegistry | null = null;

  constructor(providerName: string, providerVersion: string) {
    this.providerName = providerName;
    this.providerVersion = providerVersion;
  }

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }

  abstract resolveStrategyProvider(dividend: number, divisor: number, context: string | null): number;

  abstract resolveFactoryBean(divisor: number): IDivisibilityModuloEvaluationFactoryBean | null;

  abstract resolveChainHandler(divisor: number): IDivisibilityModuloEvaluationChainHandler | null;

  abstract getRegisteredDivisors(): readonly number[];

  setRegistry(registry: IDivisibilityModuloEvaluationFactoryBeanRegistry): void {
    this.registry = registry;
  }

  getRegistry(): IDivisibilityModuloEvaluationFactoryBeanRegistry | null {
    return this.registry;
  }

  protected resolveFromRegistry(divisor: number): IDivisibilityModuloEvaluationChainHandler | null {
    if (this.registry === null) {
      return null;
    }
    const factoryBeanName = this.registry.resolveFactoryBeanName(divisor);
    if (factoryBeanName === null) {
      return null;
    }
    const factoryBean = this.registry.getFactoryBeanInstance(factoryBeanName);
    if (factoryBean === null) {
      return null;
    }
    return factoryBean.createChainHandler();
  }
}
