import { AbstractBaseDivisibilityValidationEnforcementGate } from "../../abstracts/AbstractBaseDivisibilityValidationEnforcementGate.js";

export class DefaultDivisibilityValidationEnforcementGateImpl extends AbstractBaseDivisibilityValidationEnforcementGate {
  private static readonly GATE_NAME = "DefaultDivisibilityValidationEnforcementGate";
  private static readonly GATE_VERSION = "2.0.0-VALIDATION-ENFORCEMENT-GATE";
  private static readonly GATE_IMPLEMENTATION_TYPE = "DEFAULT_MODULO_VALIDATION_GATE";
  private static readonly VALIDATION_STRATEGY = "NATIVE_MODULO_STRATEGY";

  override enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean {
    this.validateGatePreconditions(value, divisor);
    const sanitizedValue = this.sanitizeNegativeZero(value);
    const truncatedValue = Math.trunc(sanitizedValue);
    const truncatedDivisor = Math.trunc(divisor);
    const remainder = truncatedValue % truncatedDivisor;
    const isValid = remainder === 0;
    return isValid;
  }

  override getGateName(): string {
    return DefaultDivisibilityValidationEnforcementGateImpl.GATE_NAME;
  }

  override getGateVersion(): string {
    return DefaultDivisibilityValidationEnforcementGateImpl.GATE_VERSION;
  }

  override getGateImplementationType(): string {
    return DefaultDivisibilityValidationEnforcementGateImpl.GATE_IMPLEMENTATION_TYPE;
  }

  getValidationStrategy(): string {
    return DefaultDivisibilityValidationEnforcementGateImpl.VALIDATION_STRATEGY;
  }
}
