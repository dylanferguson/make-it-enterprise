import { AbstractBaseDivisibilityOperatorDelegationChainHandler } from "../../abstracts/AbstractBaseDivisibilityOperatorDelegationChainHandler.js";

export class MonitoringAwareDivisibilityOperatorChainHandlerImpl
  extends AbstractBaseDivisibilityOperatorDelegationChainHandler
{
  private static readonly HANDLER_NAME = "MonitoringAwareDivisibilityOperatorChainHandler";
  private static readonly HANDLER_VERSION = "1.0.0-MONITORING-CHAIN-HANDLER";
  private static readonly HANDLER_PRIORITY = 1000;

  private evaluationCount: number = 0;
  private cacheHitCount: number = 0;
  private totalEvaluationTimeMs: number = 0;

  constructor() {
    super(
      MonitoringAwareDivisibilityOperatorChainHandlerImpl.HANDLER_NAME,
      MonitoringAwareDivisibilityOperatorChainHandlerImpl.HANDLER_VERSION,
      MonitoringAwareDivisibilityOperatorChainHandlerImpl.HANDLER_PRIORITY,
    );
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    this.validateOperands(dividend, divisor);
    const startTime = performance.now();
    this.evaluationCount++;
    if (this.getNextHandler() === null) {
      return false;
    }
    const result = this.proceedToNext(dividend, divisor);
    const durationMs = performance.now() - startTime;
    this.totalEvaluationTimeMs += durationMs;
    return result;
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }

  getTotalEvaluationTimeMs(): number {
    return this.totalEvaluationTimeMs;
  }

  getAverageEvaluationTimeMs(): number {
    if (this.evaluationCount === 0) return 0;
    return this.totalEvaluationTimeMs / this.evaluationCount;
  }

  resetMetrics(): void {
    this.evaluationCount = 0;
    this.cacheHitCount = 0;
    this.totalEvaluationTimeMs = 0;
  }
}
