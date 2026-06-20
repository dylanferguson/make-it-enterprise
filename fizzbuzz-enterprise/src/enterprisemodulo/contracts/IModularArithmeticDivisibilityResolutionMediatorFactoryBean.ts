import type { IModularArithmeticDivisibilityResolutionStrategyMediator } from "./IModularArithmeticDivisibilityResolutionStrategyMediator.js";

export interface IModularArithmeticDivisibilityResolutionMediatorFactoryBean {
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  getSupportedDivisor(): number;
  isSingleton(): boolean;
  createMediator(): IModularArithmeticDivisibilityResolutionStrategyMediator;
}
