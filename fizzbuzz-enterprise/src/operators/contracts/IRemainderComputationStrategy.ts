export interface IRemainderComputationStrategy {
  getStrategyName(): string;
  getStrategyVersion(): string;
  computeRemainder(dividend: number, divisor: number): number;
}
