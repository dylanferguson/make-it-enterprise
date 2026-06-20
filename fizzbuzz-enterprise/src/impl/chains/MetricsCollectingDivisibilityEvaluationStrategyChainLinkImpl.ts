import { AbstractBaseDivisibilityEvaluationStrategyChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainLink.js";
import { SloMetricsCollectorImpl } from "../slo/SloMetricsCollectorImpl.js";

export class MetricsCollectingDivisibilityEvaluationStrategyChainLinkImpl extends AbstractBaseDivisibilityEvaluationStrategyChainLink {
  private static readonly LINK_NAME = "MetricsCollectingDivisibilityEvaluationStrategyChainLink";
  private static readonly LINK_PRIORITY = 300;

  private readonly metricsCollector: SloMetricsCollectorImpl;
  private operationCount: number = 0;
  private cumulativeDurationMs: number = 0;

  constructor() {
    super(
      MetricsCollectingDivisibilityEvaluationStrategyChainLinkImpl.LINK_NAME,
      MetricsCollectingDivisibilityEvaluationStrategyChainLinkImpl.LINK_PRIORITY,
    );
    this.metricsCollector = new SloMetricsCollectorImpl();
  }

  override evaluate(dividend: number, divisor: number): number {
    this.assertOperandsValid(dividend, divisor);
    const startTime = performance.now();
    const result = this.proceedToNext(dividend, divisor);
    const durationMs = performance.now() - startTime;
    this.operationCount++;
    this.cumulativeDurationMs += durationMs;
    this.metricsCollector.recordResolveOperation(durationMs, true);
    return result;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return false;
  }

  getAverageDurationMs(): number {
    return this.operationCount === 0 ? 0 : this.cumulativeDurationMs / this.operationCount;
  }

  getOperationCount(): number {
    return this.operationCount;
  }

  getMetricsCollector(): SloMetricsCollectorImpl {
    return this.metricsCollector;
  }

  getSloCompliancePercentage(): number {
    return this.metricsCollector.getSloCompliancePercentage();
  }
}
