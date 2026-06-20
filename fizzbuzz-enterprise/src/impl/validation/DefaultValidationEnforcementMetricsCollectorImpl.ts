import { AbstractBaseValidationEnforcementMetricsCollector } from "../../abstracts/AbstractBaseValidationEnforcementMetricsCollector.js";

export class DefaultValidationEnforcementMetricsCollectorImpl
  extends AbstractBaseValidationEnforcementMetricsCollector
{
  private static readonly COLLECTOR_NAME = "DefaultValidationEnforcementMetricsCollector";
  private static readonly COLLECTOR_VERSION = "1.0.0-VALIDATION-METRICS-COLLECTOR";

  private cacheHits: number = 0;
  private cacheMisses: number = 0;
  private specificationEvaluations: Map<string, { satisfied: number; unsatisfied: number }> = new Map();
  private policyViolations: Map<string, number> = new Map();
  private readonly decoratorDurations: Map<string, { count: number; totalMicros: number }> = new Map();

  override recordGateInvocation(
    value: number,
    divisor: number,
    result: boolean,
    durationMicros: number,
  ): void {
    this.totalGateInvocations++;
    this.totalGateDurationMicros += durationMicros;
  }

  override recordDecoratorInvocation(decoratorName: string, durationMicros: number): void {
    this.totalDecoratorInvocations++;
    const existing = this.decoratorDurations.get(decoratorName) ?? { count: 0, totalMicros: 0 };
    existing.count++;
    existing.totalMicros += durationMicros;
    this.decoratorDurations.set(decoratorName, existing);
  }

  override recordSpecificationEvaluation(specificationName: string, satisfied: boolean): void {
    const existing = this.specificationEvaluations.get(specificationName) ?? { satisfied: 0, unsatisfied: 0 };
    if (satisfied) {
      existing.satisfied++;
    } else {
      existing.unsatisfied++;
    }
    this.specificationEvaluations.set(specificationName, existing);
  }

  override recordPolicyViolation(policyName: string, value: number, divisor: number): void {
    const existing = this.policyViolations.get(policyName) ?? 0;
    this.policyViolations.set(policyName, existing + 1);
  }

  override recordCacheHit(decoratorName: string): void {
    this.cacheHits++;
  }

  override recordCacheMiss(decoratorName: string): void {
    this.cacheMisses++;
  }

  override getMetricsCollectorName(): string {
    return DefaultValidationEnforcementMetricsCollectorImpl.COLLECTOR_NAME;
  }

  override getMetricsCollectorVersion(): string {
    return DefaultValidationEnforcementMetricsCollectorImpl.COLLECTOR_VERSION;
  }

  override resetMetrics(): void {
    this.totalGateInvocations = 0;
    this.totalDecoratorInvocations = 0;
    this.totalGateDurationMicros = 0;
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.specificationEvaluations.clear();
    this.policyViolations.clear();
    this.decoratorDurations.clear();
  }

  getCacheHitRate(): number {
    const total = this.cacheHits + this.cacheMisses;
    if (total === 0) {
      return 0;
    }
    return this.cacheHits / total;
  }

  getSpecificationEvaluationCount(specificationName: string): number {
    const entry = this.specificationEvaluations.get(specificationName);
    if (entry === undefined) {
      return 0;
    }
    return entry.satisfied + entry.unsatisfied;
  }

  getPolicyViolationCount(policyName: string): number {
    return this.policyViolations.get(policyName) ?? 0;
  }
}
