import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "./IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";

export interface IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor {
  visitAdapterEvaluation(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    divisor: number,
    context: string | null,
  ): void;
  visitAdapterRegistration(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    divisor: number,
  ): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitorDescriptor(): string;
  getVisitationCount(): number;
}
