import { AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl } from "../abstracts/AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl.js";

export class DivisibilityConsistencyEnterpriseFizzBuzzResultValidationSpecificationImpl
  extends AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl
{
  private readonly _divisor: number;
  private readonly _expectedOutput: string;

  constructor(
    specificationName: string,
    specificationVersion: string,
    specificationDescription: string,
    divisor: number,
    expectedOutput: string,
    priority: number,
  ) {
    super(
      specificationName,
      specificationVersion,
      specificationDescription,
      priority,
      `DIVISIBILITY_CONSISTENCY_FAILURE_DIVISOR_${divisor}`,
    );
    this._divisor = divisor;
    this._expectedOutput = expectedOutput;
  }

  getDivisor(): number {
    return this._divisor;
  }

  getExpectedOutput(): string {
    return this._expectedOutput;
  }

  override isResultValid(value: number, computedResult: string): boolean {
    if (value % this._divisor === 0) {
      return computedResult.includes(this._expectedOutput);
    }
    return true;
  }
}
