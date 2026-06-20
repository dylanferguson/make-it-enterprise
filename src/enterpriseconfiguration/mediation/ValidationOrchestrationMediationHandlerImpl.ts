import { AbstractBaseOrchestrationMediationHandlerImpl } from "./AbstractBaseOrchestrationMediationHandlerImpl.js";

export class ValidationOrchestrationMediationHandlerImpl extends AbstractBaseOrchestrationMediationHandlerImpl {
  private validationFailureCount: number = 0;

  constructor() {
    super("ValidationOrchestrationMediationHandlerImpl", "1.0.0-VALIDATION-HANDLER", 300, true);
  }

  handle(value: number, next: (v: number) => string): string {
    if (value <= 0) {
      this.validationFailureCount++;
      console.warn(
        `[ValidationOrchestrationMediationHandler v${this.getHandlerVersion()}] ` +
        `Validation failure: value=[${value}] is non-positive, returning fallback`,
      );
      return String(value);
    }
    const result = this.handleNext(value, next);
    if (result === null || result === undefined || result.trim().length === 0) {
      this.validationFailureCount++;
      console.warn(
        `[ValidationOrchestrationMediationHandler v${this.getHandlerVersion()}] ` +
        `Validation failure: empty result for value=[${value}], returning fallback`,
      );
      return String(value);
    }
    return result;
  }

  getValidationFailureCount(): number { return this.validationFailureCount; }
}
