import type { IDivisibilityValidationEnforcementGate } from "../../../contracts/IDivisibilityValidationEnforcementGate.js";
import type { IValidationEnforcementMetricsCollector } from "../../../contracts/IValidationEnforcementMetricsCollector.js";
import { AbstractBaseDivisibilityValidationEnforcementGateDecorator } from "../../../abstracts/AbstractBaseDivisibilityValidationEnforcementGateDecorator.js";

export class MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl
  extends AbstractBaseDivisibilityValidationEnforcementGateDecorator
{
  private static readonly DECORATOR_NAME = "MetricsCollectingDivisibilityValidationEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-METRICS-GATE-DECORATOR";
  private static readonly DECORATOR_ORDER = 30;

  private readonly metricsCollector: IValidationEnforcementMetricsCollector;

  constructor(
    decoratedGate: IDivisibilityValidationEnforcementGate,
    metricsCollector: IValidationEnforcementMetricsCollector,
  ) {
    super(decoratedGate);
    this.metricsCollector = metricsCollector;
  }

  override enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean {
    const startTime = performance.now();
    const result = this.decoratedGate.enforceDivisibilityValidation(
      value,
      divisor,
      validationContext,
    );
    const durationMicros = Math.trunc((performance.now() - startTime) * 1000);
    this.metricsCollector.recordGateInvocation(value, divisor, result, durationMicros);
    this.metricsCollector.recordDecoratorInvocation(
      this.getDecoratorName(),
      durationMicros,
    );
    return result;
  }

  override getGateName(): string {
    return `${MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME}:wraps:${this.decoratedGate.getGateName()}`;
  }

  override getGateVersion(): string {
    return MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getGateImplementationType(): string {
    return `METRICS_COLLECTING:${this.decoratedGate.getGateImplementationType()}`;
  }

  override getDecoratorName(): string {
    return MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorOrder(): number {
    return MetricsCollectingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_ORDER;
  }

  getMetricsCollector(): IValidationEnforcementMetricsCollector {
    return this.metricsCollector;
  }
}
