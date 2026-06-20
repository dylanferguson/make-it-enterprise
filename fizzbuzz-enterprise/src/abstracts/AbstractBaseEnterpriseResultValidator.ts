import type { IEnterpriseResultValidator } from "../contracts/IEnterpriseResultValidator.js";

export abstract class AbstractBaseEnterpriseResultValidator
  implements IEnterpriseResultValidator
{
  abstract validate(input: number, result: string): string;
  abstract getValidatorName(): string;
  abstract getValidatorPriority(): number;

  protected logValidation(input: number, result: string, isValid: boolean): void {
    console.debug(
      `[EnterpriseResultValidator:${this.getValidatorName()}] Validation ${isValid ? "passed" : "failed"} for input ${input}, result "${result}"`,
    );
  }

  protected assertResultNotEmpty(result: string): void {
    if (result.length === 0) {
      throw new Error(
        `[${this.getValidatorName()}] Validation failed: result must not be empty`,
      );
    }
  }

  protected assertResultNotNull(result: string | null): asserts result is string {
    if (result === null) {
      throw new Error(
        `[${this.getValidatorName()}] Validation failed: result must not be null`,
      );
    }
  }
}
