import { AbstractBaseDivisibilityEvaluationStrategyChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainLink.js";

export class AuditTrailDivisibilityEvaluationStrategyChainLinkImpl extends AbstractBaseDivisibilityEvaluationStrategyChainLink {
  private static readonly LINK_NAME = "AuditTrailDivisibilityEvaluationStrategyChainLink";
  private static readonly LINK_PRIORITY = 200;

  private evaluatedCount: number = 0;

  constructor() {
    super(AuditTrailDivisibilityEvaluationStrategyChainLinkImpl.LINK_NAME, AuditTrailDivisibilityEvaluationStrategyChainLinkImpl.LINK_PRIORITY);
  }

  override evaluate(dividend: number, divisor: number): number {
    this.assertOperandsValid(dividend, divisor);
    this.evaluatedCount++;
    const correlationId = this.generateCorrelationId(dividend, divisor);
    console.debug(
      `[${this.getLinkName()}] Audit trail: evaluating ${dividend} % ${divisor} (correlationId=${correlationId}, evaluation#=${this.evaluatedCount})`,
    );
    const result = this.proceedToNext(dividend, divisor);
    console.debug(
      `[${this.getLinkName()}] Audit trail: result=${result} for ${dividend} % ${divisor} (correlationId=${correlationId})`,
    );
    return result;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return false;
  }

  getEvaluatedCount(): number {
    return this.evaluatedCount;
  }

  private generateCorrelationId(dividend: number, divisor: number): string {
    return `audit:${dividend}:${divisor}:${Date.now()}:${Math.random().toString(36).substring(2, 8)}`;
  }
}
