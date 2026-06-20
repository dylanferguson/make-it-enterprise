import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";

export abstract class AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor
  implements IEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor
{
  protected abstract readonly visitorName: string;
  protected abstract readonly visitorVersion: string;
  protected visitationCount: number = 0;

  abstract visitAdapterEvaluation(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    divisor: number,
    context: string | null,
  ): void;

  abstract visitAdapterRegistration(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    divisor: number,
  ): void;

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }

  abstract getVisitorDescriptor(): string;

  getVisitationCount(): number {
    return this.visitationCount;
  }
}
