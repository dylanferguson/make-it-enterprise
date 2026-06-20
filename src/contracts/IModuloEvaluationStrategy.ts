export interface IModuloEvaluationStrategy {
  evaluateModulo(dividend: number, divisor: number): number;
  getEvaluationStrategyName(): string;
  getEvaluationStrategyVersion(): string;
  supportsDivisor(divisor: number): boolean;
}
