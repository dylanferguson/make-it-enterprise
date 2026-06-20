import { AbstractBaseDivisibilityEvaluationStrategyChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainLink.js";

export class LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl extends AbstractBaseDivisibilityEvaluationStrategyChainLink {
  private static readonly LINK_NAME = "LatencyThresholdDivisibilityEvaluationStrategyChainLink";
  private static readonly LINK_PRIORITY = 400;
  private static readonly DEFAULT_WARN_THRESHOLD_MS = 5;
  private static readonly DEFAULT_CRITICAL_THRESHOLD_MS = 20;

  private readonly warnThresholdMs: number;
  private readonly criticalThresholdMs: number;
  private totalExcessiveLatencyCount: number = 0;

  constructor(
    warnThresholdMs: number = LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl.DEFAULT_WARN_THRESHOLD_MS,
    criticalThresholdMs: number = LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl.DEFAULT_CRITICAL_THRESHOLD_MS,
  ) {
    super(
      LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl.LINK_NAME,
      LatencyThresholdDivisibilityEvaluationStrategyChainLinkImpl.LINK_PRIORITY,
    );
    this.warnThresholdMs = warnThresholdMs;
    this.criticalThresholdMs = criticalThresholdMs;
  }

  override evaluate(dividend: number, divisor: number): number {
    this.assertOperandsValid(dividend, divisor);
    const startTime = performance.now();
    const result = this.proceedToNext(dividend, divisor);
    const durationMs = performance.now() - startTime;
    if (durationMs > this.criticalThresholdMs) {
      this.totalExcessiveLatencyCount++;
      console.warn(
        `[${this.getLinkName()}] Critical latency threshold exceeded: ${durationMs.toFixed(3)}ms for ${dividend} % ${divisor} (threshold: ${this.criticalThresholdMs}ms)`,
      );
    } else if (durationMs > this.warnThresholdMs) {
      console.debug(
        `[${this.getLinkName()}] Warning latency threshold exceeded: ${durationMs.toFixed(3)}ms for ${dividend} % ${divisor} (threshold: ${this.warnThresholdMs}ms)`,
      );
    }
    return result;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return false;
  }

  getTotalExcessiveLatencyCount(): number {
    return this.totalExcessiveLatencyCount;
  }

  getWarnThresholdMs(): number {
    return this.warnThresholdMs;
  }

  getCriticalThresholdMs(): number {
    return this.criticalThresholdMs;
  }
}
