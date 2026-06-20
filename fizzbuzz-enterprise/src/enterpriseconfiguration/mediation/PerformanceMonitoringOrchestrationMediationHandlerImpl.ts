import { AbstractBaseOrchestrationMediationHandlerImpl } from "./AbstractBaseOrchestrationMediationHandlerImpl.js";

export class PerformanceMonitoringOrchestrationMediationHandlerImpl extends AbstractBaseOrchestrationMediationHandlerImpl {
  private totalDurationMs: number = 0;
  private invocationCount: number = 0;

  constructor() {
    super("PerformanceMonitoringOrchestrationMediationHandlerImpl", "1.0.0-PERF-HANDLER", 200, true);
  }

  handle(value: number, next: (v: number) => string): string {
    const startTime = Date.now();
    const result = this.handleNext(value, next);
    const duration = Date.now() - startTime;
    this.totalDurationMs += duration;
    this.invocationCount++;
    const avgDuration = this.invocationCount > 0
      ? (this.totalDurationMs / this.invocationCount).toFixed(2) : "0.00";
    console.debug(
      `[PerformanceMonitoringOrchestrationMediationHandler v${this.getHandlerVersion()}] ` +
      `Computation duration=[${duration}ms], avg=[${avgDuration}ms], ` +
      `totalInvocations=[${this.invocationCount}]`,
    );
    return result;
  }

  getAverageDurationMs(): number {
    return this.invocationCount > 0 ? this.totalDurationMs / this.invocationCount : 0;
  }

  getTotalDurationMs(): number { return this.totalDurationMs; }
  getInvocationCount(): number { return this.invocationCount; }
}
