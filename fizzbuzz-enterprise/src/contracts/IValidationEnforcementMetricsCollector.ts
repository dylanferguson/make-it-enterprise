export interface IValidationEnforcementMetricsCollector {
  recordGateInvocation(value: number, divisor: number, result: boolean, durationMicros: number): void;
  recordDecoratorInvocation(decoratorName: string, durationMicros: number): void;
  recordSpecificationEvaluation(specificationName: string, satisfied: boolean): void;
  recordPolicyViolation(policyName: string, value: number, divisor: number): void;
  recordCacheHit(decoratorName: string): void;
  recordCacheMiss(decoratorName: string): void;
  getTotalGateInvocations(): number;
  getTotalDecoratorInvocations(): number;
  getAverageGateInvocationDurationMicros(): number;
  getMetricsCollectorName(): string;
  getMetricsCollectorVersion(): string;
  resetMetrics(): void;
}
