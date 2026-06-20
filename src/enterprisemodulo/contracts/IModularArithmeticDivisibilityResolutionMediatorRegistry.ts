import type { IModularArithmeticDivisibilityResolutionMediatorFactoryBean } from "./IModularArithmeticDivisibilityResolutionMediatorFactoryBean.js";

export interface IModularArithmeticDivisibilityResolutionMediatorRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerMediatorFactoryBean(divisor: number, factoryBean: IModularArithmeticDivisibilityResolutionMediatorFactoryBean): void;
  resolveMediatorFactoryBean(divisor: number): IModularArithmeticDivisibilityResolutionMediatorFactoryBean | null;
  getRegisteredDivisors(): number[];
  getFactoryBeanCount(): number;
}
