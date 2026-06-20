import type { IModularArithmeticDivisibilityResolutionMediatorRegistry } from "../contracts/IModularArithmeticDivisibilityResolutionMediatorRegistry.js";
import type { IModularArithmeticDivisibilityResolutionMediatorFactoryBean } from "../contracts/IModularArithmeticDivisibilityResolutionMediatorFactoryBean.js";

export abstract class AbstractBaseModularArithmeticDivisibilityResolutionMediatorRegistry
  implements IModularArithmeticDivisibilityResolutionMediatorRegistry
{
  private static readonly DEFAULT_REGISTRY_VERSION = "1.0.0-BASE-REGISTRY";

  private readonly registryName: string;
  private readonly registryVersion: string;
  protected factoryBeanMap: Map<number, IModularArithmeticDivisibilityResolutionMediatorFactoryBean> = new Map();

  constructor(
    registryName: string,
    registryVersion: string = AbstractBaseModularArithmeticDivisibilityResolutionMediatorRegistry.DEFAULT_REGISTRY_VERSION,
  ) {
    this.registryName = registryName;
    this.registryVersion = registryVersion;
  }

  getRegistryName(): string {
    return this.registryName;
  }

  getRegistryVersion(): string {
    return this.registryVersion;
  }

  registerMediatorFactoryBean(
    divisor: number,
    factoryBean: IModularArithmeticDivisibilityResolutionMediatorFactoryBean,
  ): void {
    this.factoryBeanMap.set(divisor, factoryBean);
  }

  resolveMediatorFactoryBean(
    divisor: number,
  ): IModularArithmeticDivisibilityResolutionMediatorFactoryBean | null {
    return this.factoryBeanMap.get(divisor) ?? null;
  }

  getRegisteredDivisors(): number[] {
    return Array.from(this.factoryBeanMap.keys()).sort((a, b) => a - b);
  }

  getFactoryBeanCount(): number {
    return this.factoryBeanMap.size;
  }
}
