import { AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl } from "../abstracts/AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl.js";

export class LengthConstrainedEnterpriseFizzBuzzResultValidationSpecificationImpl
  extends AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl
{
  private readonly _maxLength: number;

  constructor(
    specificationName: string,
    specificationVersion: string,
    specificationDescription: string,
    maxLength: number,
    priority: number,
  ) {
    super(
      specificationName,
      specificationVersion,
      specificationDescription,
      priority,
      `LENGTH_CONSTRAINT_EXCEEDED_MAX_${maxLength}`,
    );
    this._maxLength = maxLength;
  }

  getMaxLength(): number {
    return this._maxLength;
  }

  override isResultValid(_value: number, computedResult: string): boolean {
    return computedResult.length <= this._maxLength;
  }
}
