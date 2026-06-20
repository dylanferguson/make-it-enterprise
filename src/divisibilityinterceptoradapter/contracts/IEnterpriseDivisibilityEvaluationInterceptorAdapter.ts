import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy } from "./IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy.js";

export interface IEnterpriseDivisibilityEvaluationInterceptorAdapter {
  interceptEvaluation(value: number, divisor: number, context: string | null): number;
  registerInterceptorAdapterStrategy(
    divisor: number,
    strategy: IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy,
  ): void;
  resolveAdapterStrategy(
    divisor: number,
  ): IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy | null;
  getAdapterName(): string;
  getAdapterVersion(): string;
  getRegisteredDivisors(): readonly number[];
  getAdapterInvocationCount(): number;
}
