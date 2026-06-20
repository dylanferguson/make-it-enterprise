import type { IDivisibilityOperator } from "./IDivisibilityOperator.js";
import type { IDivisibilityOperatorFactory } from "./IDivisibilityOperatorFactory.js";

export interface IDivisibilityOperatorProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  resolveOperator(): IDivisibilityOperator;
  resolveOperatorForDivisor(divisor: number): IDivisibilityOperator;
  getRegisteredFactoryCount(): number;
  registerFactory(factory: IDivisibilityOperatorFactory): void;
}
