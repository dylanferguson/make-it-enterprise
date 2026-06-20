export interface IDivisibilityStrategyEvaluator {
  evaluateModuloRemainder(dividend: number, divisor: number): number;
  isDivisible(dividend: number, divisor: number): boolean;
  getEvaluatorName(): string;
  getEvaluatorVersion(): string;
}
