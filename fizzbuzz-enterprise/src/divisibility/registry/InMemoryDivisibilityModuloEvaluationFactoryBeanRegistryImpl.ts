import { AbstractBaseDivisibilityModuloEvaluationFactoryBeanRegistry } from "../abstracts/AbstractBaseDivisibilityModuloEvaluationFactoryBeanRegistry.js";
import type { IDivisibilityModuloEvaluationFactoryBean } from "../contracts/IDivisibilityModuloEvaluationFactoryBean.js";

export class InMemoryDivisibilityModuloEvaluationFactoryBeanRegistryImpl
  extends AbstractBaseDivisibilityModuloEvaluationFactoryBeanRegistry
{
  private static readonly REGISTRY_NAME = "InMemoryDivisibilityModuloEvaluationFactoryBeanRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-INMEMORY-REGISTRY";

  private readonly divisorToFactoryBeanName: Map<number, string> = new Map();
  private readonly factoryBeanNameToInstance: Map<string, IDivisibilityModuloEvaluationFactoryBean> = new Map();

  constructor() {
    super(
      InMemoryDivisibilityModuloEvaluationFactoryBeanRegistryImpl.REGISTRY_NAME,
      InMemoryDivisibilityModuloEvaluationFactoryBeanRegistryImpl.REGISTRY_VERSION,
    );
  }

  override registerFactoryBean(divisor: number, factoryBean: IDivisibilityModuloEvaluationFactoryBean): void {
    const name = factoryBean.getFactoryBeanName();
    this.divisorToFactoryBeanName.set(divisor, name);
    this.factoryBeanNameToInstance.set(name, factoryBean);
  }

  override resolveFactoryBeanName(divisor: number): string | null {
    return this.divisorToFactoryBeanName.get(divisor) ?? null;
  }

  override getFactoryBeanInstance(factoryBeanName: string): IDivisibilityModuloEvaluationFactoryBean | null {
    return this.factoryBeanNameToInstance.get(factoryBeanName) ?? null;
  }

  override getRegisteredDivisors(): readonly number[] {
    return Array.from(this.divisorToFactoryBeanName.keys());
  }

  override isDivisorRegistered(divisor: number): boolean {
    return this.divisorToFactoryBeanName.has(divisor);
  }

  override getFactoryBeanCount(): number {
    return this.factoryBeanNameToInstance.size;
  }
}
