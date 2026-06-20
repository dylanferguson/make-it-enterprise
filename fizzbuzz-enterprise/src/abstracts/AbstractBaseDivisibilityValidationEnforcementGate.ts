import type { IDivisibilityValidationEnforcementGate } from "../contracts/IDivisibilityValidationEnforcementGate.js";

export abstract class AbstractBaseDivisibilityValidationEnforcementGate
  implements IDivisibilityValidationEnforcementGate
{
  protected static readonly DEFAULT_VALIDATION_CONTEXT = "DEFAULT_VALIDATION_CONTEXT";
  protected static readonly MAX_VALIDATION_RECURSION_DEPTH = 10;
  protected static readonly NEGATIVE_ZERO_TOLERANCE = 0;

  abstract getGateName(): string;
  abstract getGateVersion(): string;
  abstract getGateImplementationType(): string;

  abstract enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean;

  protected validateGatePreconditions(value: number, divisor: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.getGateName()} v${this.getGateVersion()}] Gate precondition violation: value must be finite, received: ${value}`,
      );
    }
    if (!Number.isFinite(divisor) || divisor <= 0) {
      throw new Error(
        `[${this.getGateName()} v${this.getGateVersion()}] Gate precondition violation: divisor must be a positive finite number, received: ${divisor}`,
      );
    }
  }

  protected createValidationTraceId(value: number, divisor: number): string {
    return `gate:val:${value}:${divisor}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }

  protected sanitizeNegativeZero(value: number): number {
    if (Object.is(value, -0)) {
      return AbstractBaseDivisibilityValidationEnforcementGate.NEGATIVE_ZERO_TOLERANCE;
    }
    return value;
  }

  protected getDefaultValidationContext(): string {
    return AbstractBaseDivisibilityValidationEnforcementGate.DEFAULT_VALIDATION_CONTEXT;
  }

  protected getMaxValidationRecursionDepth(): number {
    return AbstractBaseDivisibilityValidationEnforcementGate.MAX_VALIDATION_RECURSION_DEPTH;
  }
}
