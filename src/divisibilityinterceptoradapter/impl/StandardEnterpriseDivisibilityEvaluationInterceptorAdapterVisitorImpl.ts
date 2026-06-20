import { AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor } from "../abstracts/AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";

export class StandardEnterpriseDivisibilityEvaluationInterceptorAdapterVisitorImpl
  extends AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor
{
  private static readonly VISITOR_NAME = "StandardEnterpriseDivisibilityEvaluationInterceptorAdapterVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-DIV-INTERCEPT-VISITOR";
  private static readonly VISITOR_DESCRIPTOR = "mode=STANDARD;auditEnabled=true;traceDepth=FULL";

  protected readonly visitorName = StandardEnterpriseDivisibilityEvaluationInterceptorAdapterVisitorImpl.VISITOR_NAME;
  protected readonly visitorVersion = StandardEnterpriseDivisibilityEvaluationInterceptorAdapterVisitorImpl.VISITOR_VERSION;

  private readonly visitationAuditTrail: string[] = [];

  visitAdapterEvaluation(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    divisor: number,
    context: string | null,
  ): void {
    this.visitationCount++;
    const auditEntry = `EVAL:adapter=[${adapter.getAdapterName()}],divisor=[${divisor}],context=[${context ?? "null"}],invocation=[${adapter.getAdapterInvocationCount()}]`;
    this.visitationAuditTrail.push(auditEntry);
  }

  visitAdapterRegistration(
    adapter: IEnterpriseDivisibilityEvaluationInterceptorAdapter,
    divisor: number,
  ): void {
    this.visitationCount++;
    const auditEntry = `REG:adapter=[${adapter.getAdapterName()}],divisor=[${divisor}],registeredDivisors=[${adapter.getRegisteredDivisors().join(", ")}]`;
    this.visitationAuditTrail.push(auditEntry);
  }

  getVisitorDescriptor(): string {
    return StandardEnterpriseDivisibilityEvaluationInterceptorAdapterVisitorImpl.VISITOR_DESCRIPTOR;
  }

  getVisitationAuditTrail(): readonly string[] {
    return [...this.visitationAuditTrail];
  }
}
