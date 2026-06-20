import type { IRemainderComputationStrategy } from "./IRemainderComputationStrategy.js";
import type { IRemainderComputationStrategySelector } from "./IRemainderComputationStrategySelector.js";

export interface IRemainderComputationStrategyProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  getStrategySelector(): IRemainderComputationStrategySelector;
  resolveRemainder(dividend: number, divisor: number): number;
  resolveDivisibility(dividend: number, divisor: number): boolean;
}
