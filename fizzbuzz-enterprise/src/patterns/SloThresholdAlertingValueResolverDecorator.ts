import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";
import type { ISloMetricsCollector } from "../contracts/ISloMetricsCollector.js";

export class SloThresholdAlertingValueResolverDecorator implements ICompositeValueResolver {
  private static readonly DECORATOR_NAME = "SloThresholdAlertingValueResolverDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-SLO-ALERTING";
  private static readonly DEFAULT_SLO_THRESHOLD_MS = 10;
  private static readonly DEFAULT_SLO_BUDGET_CONSUMPTION_WARNING_PCT = 80;

  private readonly decorated: ICompositeValueResolver;
  private readonly sloMetricsCollector: ISloMetricsCollector;
  private readonly sloThresholdMs: number;
  private readonly budgetWarningThresholdPct: number;
  private totalOperations: number = 0;
  private sloViolations: number = 0;

  constructor(
    decorated: ICompositeValueResolver,
    sloMetricsCollector?: ISloMetricsCollector,
    sloThresholdMs: number = SloThresholdAlertingValueResolverDecorator.DEFAULT_SLO_THRESHOLD_MS,
    budgetWarningThresholdPct: number = SloThresholdAlertingValueResolverDecorator.DEFAULT_SLO_BUDGET_CONSUMPTION_WARNING_PCT,
  ) {
    this.decorated = decorated;
    this.sloMetricsCollector = sloMetricsCollector ?? new (class implements ISloMetricsCollector {
      recordResolveOperation(_durationMs: number, _success: boolean): void {}
      getTotalOperations(): number { return 0; }
      getSuccessfulOperations(): number { return 0; }
      getFailedOperations(): number { return 0; }
      getAverageResponseTimeMs(): number { return 0; }
      getP99ResponseTimeMs(): number { return 0; }
      getSloCompliancePercentage(): number { return 100; }
      getSloName(): string { return "DefaultSloCollector"; }
      getSloTarget(): number { return 99.9; }
      resetMetrics(): void {}
    })();
    this.sloThresholdMs = sloThresholdMs;
    this.budgetWarningThresholdPct = budgetWarningThresholdPct;
  }

  resolve(value: number): string {
    this.totalOperations++;
    const startTime = performance.now();
    const result = this.decorated.resolve(value);
    const durationMs = performance.now() - startTime;

    this.sloMetricsCollector.recordResolveOperation(durationMs, true);
    if (durationMs > this.sloThresholdMs) {
      this.sloViolations++;
      const compliancePct = this.getCurrentSloCompliance();
      if (compliancePct < (100 - this.budgetWarningThresholdPct)) {
        console.warn(
          `[${SloThresholdAlertingValueResolverDecorator.DECORATOR_NAME}] SLO budget critically depleted: ` +
          `compliance=${compliancePct.toFixed(2)}%, violations=${this.sloViolations}/${this.totalOperations}, ` +
          `value=${value}, duration=${durationMs.toFixed(3)}ms`,
        );
      }
    }
    return result;
  }

  getCurrentSloCompliance(): number {
    if (this.totalOperations === 0) return 100;
    return ((this.totalOperations - this.sloViolations) / this.totalOperations) * 100;
  }

  getTotalOperations(): number {
    return this.totalOperations;
  }

  getSloViolations(): number {
    return this.sloViolations;
  }

  getDecoratorName(): string {
    return SloThresholdAlertingValueResolverDecorator.DECORATOR_NAME;
  }

  getDecoratorVersion(): string {
    return SloThresholdAlertingValueResolverDecorator.DECORATOR_VERSION;
  }

  getDecoratedResolver(): ICompositeValueResolver {
    return this.decorated;
  }
}
