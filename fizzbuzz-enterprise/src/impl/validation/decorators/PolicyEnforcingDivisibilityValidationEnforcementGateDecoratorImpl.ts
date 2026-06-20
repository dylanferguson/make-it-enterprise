import type { IDivisibilityValidationEnforcementGate } from "../../../contracts/IDivisibilityValidationEnforcementGate.js";
import type { IValidationEnforcementMetricsCollector } from "../../../contracts/IValidationEnforcementMetricsCollector.js";
import { AbstractBaseDivisibilityValidationEnforcementGateDecorator } from "../../../abstracts/AbstractBaseDivisibilityValidationEnforcementGateDecorator.js";

export class PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl
  extends AbstractBaseDivisibilityValidationEnforcementGateDecorator
{
  private static readonly DECORATOR_NAME = "PolicyEnforcingDivisibilityValidationEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-POLICY-GATE-DECORATOR";
  private static readonly DECORATOR_ORDER = 5;
  private static readonly MAX_VALIDATION_VALUE = 1000000;
  private static readonly MAX_VALIDATION_DIVISOR = 100000;

  private readonly metricsCollector: IValidationEnforcementMetricsCollector | null;

  constructor(
    decoratedGate: IDivisibilityValidationEnforcementGate,
    metricsCollector: IValidationEnforcementMetricsCollector | null = null,
  ) {
    super(decoratedGate);
    this.metricsCollector = metricsCollector;
  }

  override enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean {
    if (!Number.isFinite(value) || value < 0) {
      if (this.metricsCollector !== null) {
        this.metricsCollector.recordPolicyViolation(
          "NON_NEGATIVE_VALUE_POLICY",
          value,
          divisor,
        );
      }
      throw new Error(
        `[${this.getDecoratorName()}] Policy violation: value must be non-negative finite number, received: ${value}`,
      );
    }
    if (Math.trunc(value) !== value) {
      if (this.metricsCollector !== null) {
        this.metricsCollector.recordPolicyViolation(
          "INTEGER_VALUE_POLICY",
          value,
          divisor,
        );
      }
      throw new Error(
        `[${this.getDecoratorName()}] Policy violation: value must be an integer, received: ${value}`,
      );
    }
    if (value > PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.MAX_VALIDATION_VALUE) {
      if (this.metricsCollector !== null) {
        this.metricsCollector.recordPolicyViolation(
          "MAX_VALUE_BOUNDARY_POLICY",
          value,
          divisor,
        );
      }
      throw new Error(
        `[${this.getDecoratorName()}] Policy violation: value ${value} exceeds maximum allowed ${PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.MAX_VALIDATION_VALUE}`,
      );
    }
    return this.decoratedGate.enforceDivisibilityValidation(
      value,
      divisor,
      validationContext,
    );
  }

  override getGateName(): string {
    return `${PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME}:wraps:${this.decoratedGate.getGateName()}`;
  }

  override getGateVersion(): string {
    return PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getGateImplementationType(): string {
    return `POLICY_ENFORCING:${this.decoratedGate.getGateImplementationType()}`;
  }

  override getDecoratorName(): string {
    return PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorOrder(): number {
    return PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_ORDER;
  }

  getMaxValidationValue(): number {
    return PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.MAX_VALIDATION_VALUE;
  }

  getMaxValidationDivisor(): number {
    return PolicyEnforcingDivisibilityValidationEnforcementGateDecoratorImpl.MAX_VALIDATION_DIVISOR;
  }
}
