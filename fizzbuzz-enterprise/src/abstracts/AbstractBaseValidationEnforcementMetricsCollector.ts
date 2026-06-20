import type { IValidationEnforcementMetricsCollector } from "../contracts/IValidationEnforcementMetricsCollector.js";

export abstract class AbstractBaseValidationEnforcementMetricsCollector
  implements IValidationEnforcementMetricsCollector
{
  protected static readonly METRICS_FRAMEWORK_VERSION = "1.0.0-VALIDATION-METRICS-FRAMEWORK";
  protected static readonly METRICS_WINDOW_SIZE = 1000;
  protected static readonly METRICS_PERCENTILE_P99_INDEX = 99;

  protected totalGateInvocations: number = 0;
  protected totalDecoratorInvocations: number = 0;
  protected totalGateDurationMicros: number = 0;

  abstract getMetricsCollectorName(): string;
  abstract getMetricsCollectorVersion(): string;
  abstract recordGateInvocation(
    value: number,
    divisor: number,
    result: boolean,
    durationMicros: number,
  ): void;
  abstract recordDecoratorInvocation(decoratorName: string, durationMicros: number): void;
  abstract recordSpecificationEvaluation(specificationName: string, satisfied: boolean): void;
  abstract recordPolicyViolation(policyName: string, value: number, divisor: number): void;
  abstract recordCacheHit(decoratorName: string): void;
  abstract recordCacheMiss(decoratorName: string): void;

  getTotalGateInvocations(): number {
    return this.totalGateInvocations;
  }

  getTotalDecoratorInvocations(): number {
    return this.totalDecoratorInvocations;
  }

  getAverageGateInvocationDurationMicros(): number {
    if (this.totalGateInvocations === 0) {
      return 0;
    }
    return Math.trunc(this.totalGateDurationMicros / this.totalGateInvocations);
  }

  abstract resetMetrics(): void;

  protected getMetricsFrameworkVersion(): string {
    return AbstractBaseValidationEnforcementMetricsCollector.METRICS_FRAMEWORK_VERSION;
  }

  protected getMetricsWindowSize(): number {
    return AbstractBaseValidationEnforcementMetricsCollector.METRICS_WINDOW_SIZE;
  }
}
