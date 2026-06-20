import type { IModularArithmeticDivisibilityResolutionStrategyMediator } from "./IModularArithmeticDivisibilityResolutionStrategyMediator.js";

export interface IModularArithmeticDivisibilityResolutionMediatorProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  resolveMediator(divisor: number): IModularArithmeticDivisibilityResolutionStrategyMediator;
  getRegisteredDivisors(): number[];
}
