import { AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl } from "../abstracts/AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl.js";

export class AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl
  extends AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl
{
  private static readonly SPECIFICATION_NAME = "AlwaysValidEnterpriseFizzBuzzResultValidationSpecification";
  private static readonly SPECIFICATION_VERSION = "1.0.0-ALWAYS-VALID";
  private static readonly SPECIFICATION_DESCRIPTION = "Validation specification that accepts all computed results as valid";
  private static readonly VALIDATION_PRIORITY = 0;
  private static readonly FAILURE_CODE = "ALWAYS_VALID_SPEC_NO_FAILURE";

  constructor() {
    super(
      AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl.SPECIFICATION_NAME,
      AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl.SPECIFICATION_VERSION,
      AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl.SPECIFICATION_DESCRIPTION,
      AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl.VALIDATION_PRIORITY,
      AlwaysValidEnterpriseFizzBuzzResultValidationSpecificationImpl.FAILURE_CODE,
    );
  }

  override isResultValid(_value: number, _computedResult: string): boolean {
    return true;
  }
}
