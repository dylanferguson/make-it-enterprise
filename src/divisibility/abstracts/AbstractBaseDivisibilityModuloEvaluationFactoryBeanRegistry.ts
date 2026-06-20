import type { IDivisibilityModuloEvaluationFactoryBeanRegistry } from "../factories/IDivisibilityModuloEvaluationFactoryBeanRegistry.js";
import type { IDivisibilityModuloEvaluationFactoryBean } from "../contracts/IDivisibilityModuloEvaluationFactoryBean.js";

export abstract class AbstractBaseDivisibilityModuloEvaluationFactoryBeanRegistry
  implements IDivisibilityModuloEvaluationFactoryBeanRegistry
{
  private readonly registryName: string;
  private readonly registryVersion: string;

  constructor(registryName: string, registryVersion: string) {
    this.registryName = registryName;
    this.registryVersion = registryVersion;
  }

  getRegistryName(): string {
    return this.registryName;
  }

  getRegistryVersion(): string {
    return this.registryVersion;
  }

  abstract registerFactoryBean(divisor: number, factoryBean: IDivisibilityModuloEvaluationFactoryBean): void;
  abstract resolveFactoryBeanName(divisor: number): string | null;
  abstract getFactoryBeanInstance(factoryBeanName: string): IDivisibilityModuloEvaluationFactoryBean | null;
  abstract getRegisteredDivisors(): readonly number[];
  abstract isDivisorRegistered(divisor: number): boolean;
  abstract getFactoryBeanCount(): number;
}
