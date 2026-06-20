export interface IComputationOutcomeLifecycleSpecificationValidator {
  getValidatorName(): string;
  getValidatorVersion(): string;
  getValidationPriority(): number;
  validateOutcome(value: number, computedResult: string): IComputationOutcomeLifecycleValidationResult;
  isValidationEnabled(): boolean;
  getValidationDescription(): string;
}

export interface IComputationOutcomeLifecycleValidationResult {
  isValid: boolean;
  validationMessage: string;
  validatorName: string;
  validatedValue: number;
  validatedResult: string;
}
