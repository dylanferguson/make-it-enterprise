import { AbstractBaseEnterpriseResultValidator } from "../../abstracts/AbstractBaseEnterpriseResultValidator.js";

export class FizzBuzzEnterpriseResultValidatorImpl extends AbstractBaseEnterpriseResultValidator {
  private static readonly VALIDATOR_NAME = "FizzBuzzEnterpriseResultValidator";
  private static readonly VALIDATOR_PRIORITY = 100;

  override validate(input: number, result: string): string {
    this.assertResultNotNull(result as string | null);
    this.assertResultNotEmpty(result);
    this.logValidation(input, result, true);
    return result;
  }

  override getValidatorName(): string {
    return FizzBuzzEnterpriseResultValidatorImpl.VALIDATOR_NAME;
  }

  override getValidatorPriority(): number {
    return FizzBuzzEnterpriseResultValidatorImpl.VALIDATOR_PRIORITY;
  }
}
