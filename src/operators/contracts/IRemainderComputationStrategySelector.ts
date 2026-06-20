import type { IRemainderComputationStrategy } from "./IRemainderComputationStrategy.js";

export interface IRemainderComputationStrategySelector {
  getSelectorName(): string;
  getSelectorVersion(): string;
  selectStrategy(divisor: number): IRemainderComputationStrategy;
  registerStrategy(divisor: number, strategy: IRemainderComputationStrategy): void;
  getRegisteredDivisorCount(): number;
}
