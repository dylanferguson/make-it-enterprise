import { AbstractBaseDivisibilityEvaluationSupervisionChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationSupervisionChainLink.js";
import type { IDivisibilityEvaluationSupervisionChainLink } from "../../contracts/IDivisibilityEvaluationSupervisionChainLink.js";

export class AuditTrailDivisibilityEvaluationSupervisionChainDecoratorImpl
  extends AbstractBaseDivisibilityEvaluationSupervisionChainLink
  implements IDivisibilityEvaluationSupervisionChainLink
{
  private static readonly LINK_NAME = "AuditTrailDivisibilityEvaluationSupervisionChainDecorator";
  private static readonly LINK_PRIORITY = 75;
  private readonly wrappedLink: IDivisibilityEvaluationSupervisionChainLink;

  constructor(wrappedLink: IDivisibilityEvaluationSupervisionChainLink) {
    super();
    this.wrappedLink = wrappedLink;
  }

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    const startTime = performance.now();
    const result = this.wrappedLink.evaluateDivisibility(dividend, divisor);
    const durationMs = performance.now() - startTime;
    console.debug(
      `[${AuditTrailDivisibilityEvaluationSupervisionChainDecoratorImpl.LINK_NAME}] ` +
      `dividend=${dividend}, divisor=${divisor}, result=${result}, durationMs=${durationMs.toFixed(2)}`,
    );
    if (!result) {
      return this.proceedToNext(dividend, divisor);
    }
    return result;
  }

  override getLinkName(): string {
    return AuditTrailDivisibilityEvaluationSupervisionChainDecoratorImpl.LINK_NAME;
  }

  override getLinkPriority(): number {
    return AuditTrailDivisibilityEvaluationSupervisionChainDecoratorImpl.LINK_PRIORITY;
  }
}
