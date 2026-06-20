import type {
  IComputationOutcomeLifecycleSpecificationValidator,
  IComputationOutcomeLifecycleValidationResult,
} from "../contracts/IComputationOutcomeLifecycleSpecificationValidator.js";

export class DefaultComputationOutcomeLifecycleSpecificationValidatorImpl
  implements IComputationOutcomeLifecycleSpecificationValidator
{
  private readonly _validatorName: string;
  private readonly _validatorVersion: string;
  private readonly _validationPriority: number;
  private readonly _validationDescription: string;
  private readonly _validationFn: (value: number, computedResult: string) => boolean;
  private readonly _onInvalidMessage: string;
  private _enabled: boolean;

  constructor(
    validatorName: string,
    validatorVersion: string,
    validationPriority: number,
    validationDescription: string,
    validationFn: (value: number, computedResult: string) => boolean,
    onInvalidMessage: string,
    enabled: boolean,
  ) {
    this._validatorName = validatorName;
    this._validatorVersion = validatorVersion;
    this._validationPriority = validationPriority;
    this._validationDescription = validationDescription;
    this._validationFn = validationFn;
    this._onInvalidMessage = onInvalidMessage;
    this._enabled = enabled;
  }

  getValidatorName(): string {
    return this._validatorName;
  }

  getValidatorVersion(): string {
    return this._validatorVersion;
  }

  getValidationPriority(): number {
    return this._validationPriority;
  }

  validateOutcome(value: number, computedResult: string): IComputationOutcomeLifecycleValidationResult {
    const isValid = this._validationFn(value, computedResult);
    return {
      isValid,
      validationMessage: isValid ? "VALID" : this._onInvalidMessage,
      validatorName: this._validatorName,
      validatedValue: value,
      validatedResult: computedResult,
    };
  }

  isValidationEnabled(): boolean {
    return this._enabled;
  }

  setValidationEnabled(enabled: boolean): void {
    this._enabled = enabled;
  }

  getValidationDescription(): string {
    return this._validationDescription;
  }
}
