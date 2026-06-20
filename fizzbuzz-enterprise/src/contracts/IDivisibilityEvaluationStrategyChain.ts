export interface IDivisibilityEvaluationStrategyChain {
  evaluate(dividend: number, divisor: number): number;
  getChainName(): string;
  getChainVersion(): string;
  getChainDescription(): string;
}
