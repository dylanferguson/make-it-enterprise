export interface IDivisibilityValidationEnforcementGate {
  enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean;
  getGateName(): string;
  getGateVersion(): string;
  getGateImplementationType(): string;
}
