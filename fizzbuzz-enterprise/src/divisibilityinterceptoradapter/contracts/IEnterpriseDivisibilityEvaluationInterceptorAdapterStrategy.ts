export interface IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy {
  resolveInterceptedRemainder(
    dividend: number,
    divisor: number,
    context: string | null,
  ): number;
  getStrategyName(): string;
  getStrategyVersion(): string;
  getStrategyDivisor(): number;
  isStrategyEnabled(): boolean;
}
