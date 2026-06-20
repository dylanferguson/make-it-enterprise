import { AbstractBaseDivisibilityModuloEvaluationChainHandler } from "../abstracts/AbstractBaseDivisibilityModuloEvaluationChainHandler.js";

export class DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl
  extends AbstractBaseDivisibilityModuloEvaluationChainHandler
{
  private static readonly HANDLER_NAME = "DecorativeValidationDivisibilityModuloEvaluationChainHandler";
  private static readonly HANDLER_VERSION = "1.0.0-DECORATIVE-VALIDATION-CHAIN";
  private static readonly HANDLER_PRIORITY = 50;

  private validationInvocationCount: number = 0;
  private validationPassCount: number = 0;

  constructor() {
    super(
      DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME,
      DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_VERSION,
      DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_PRIORITY,
    );
  }

  override handleModuloEvaluation(dividend: number, divisor: number, evaluationContext: string | null): number {
    this.validationInvocationCount++;
    this.validatePreconditions(dividend, divisor, evaluationContext);
    const remainder = this.delegateToNext(dividend, divisor, evaluationContext);
    this.validatePostconditions(dividend, divisor, remainder, evaluationContext);
    this.validationPassCount++;
    return remainder;
  }

  getValidationInvocationCount(): number {
    return this.validationInvocationCount;
  }

  getValidationPassCount(): number {
    return this.validationPassCount;
  }

  private validatePreconditions(dividend: number, divisor: number, _evaluationContext: string | null): void {
    if (!Number.isFinite(dividend) || dividend < 0) {
      throw new Error(
        `[${DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME}] ` +
        `Precondition violation: dividend must be a finite non-negative number, received ${dividend}`,
      );
    }
    if (!Number.isFinite(divisor) || divisor <= 0) {
      throw new Error(
        `[${DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME}] ` +
        `Precondition violation: divisor must be a positive finite number, received ${divisor}`,
      );
    }
  }

  private validatePostconditions(dividend: number, divisor: number, remainder: number, _evaluationContext: string | null): void {
    if (!Number.isFinite(remainder) || remainder < 0 || remainder >= divisor) {
      console.warn(
        `[${DecorativeValidationDivisibilityModuloEvaluationChainHandlerImpl.HANDLER_NAME}] ` +
        `Postcondition warning: remainder=${remainder} for ${dividend} % ${divisor} ` +
        `is outside expected range [0, ${divisor})`,
      );
    }
  }
}
