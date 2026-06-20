import type { IDivisibilityValidationEnforcementGate } from "../../../contracts/IDivisibilityValidationEnforcementGate.js";
import { AbstractBaseDivisibilityValidationEnforcementGateDecorator } from "../../../abstracts/AbstractBaseDivisibilityValidationEnforcementGateDecorator.js";

export class LoggingDivisibilityValidationEnforcementGateDecoratorImpl
  extends AbstractBaseDivisibilityValidationEnforcementGateDecorator
{
  private static readonly DECORATOR_NAME = "LoggingDivisibilityValidationEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-LOGGING-GATE-DECORATOR";
  private static readonly DECORATOR_ORDER = 10;
  private static readonly AUDIT_LOG_PREFIX = "[DivisibilityValidationGate]";

  constructor(decoratedGate: IDivisibilityValidationEnforcementGate) {
    super(decoratedGate);
  }

  override enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean {
    const traceId = this.createDecoratorAuditTrailEntry(
      this.getDecoratorName(),
      value,
      divisor,
      false,
    );
    console.debug(
      `${LoggingDivisibilityValidationEnforcementGateDecoratorImpl.AUDIT_LOG_PREFIX} ` +
      `[${this.getDecoratorName()} v${this.getDecoratorVersion()}] ` +
      `Invoking divisibility validation: value=${value}, divisor=${divisor}, ` +
      `context=${validationContext}, traceId=${traceId}`,
    );
    const startTime = performance.now();
    const result = this.decoratedGate.enforceDivisibilityValidation(
      value,
      divisor,
      validationContext,
    );
    const durationMicros = Math.trunc((performance.now() - startTime) * 1000);
    console.debug(
      `${LoggingDivisibilityValidationEnforcementGateDecoratorImpl.AUDIT_LOG_PREFIX} ` +
      `[${this.getDecoratorName()}] Validation result: ${result}, ` +
      `duration=${durationMicros}µs, traceId=${traceId}`,
    );
    return result;
  }

  override getGateName(): string {
    return `${LoggingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME}:wraps:${this.decoratedGate.getGateName()}`;
  }

  override getGateVersion(): string {
    return LoggingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getGateImplementationType(): string {
    return `DECORATED:${this.decoratedGate.getGateImplementationType()}`;
  }

  override getDecoratorName(): string {
    return LoggingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return LoggingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorOrder(): number {
    return LoggingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_ORDER;
  }
}
