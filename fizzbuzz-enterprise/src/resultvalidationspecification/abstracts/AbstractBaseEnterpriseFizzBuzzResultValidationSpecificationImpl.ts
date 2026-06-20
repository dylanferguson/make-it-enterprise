import type { IEnterpriseFizzBuzzResultValidationSpecification } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecification.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationImpl
  implements IEnterpriseFizzBuzzResultValidationSpecification
{
  private readonly _specificationName: string;
  private readonly _specificationVersion: string;
  private readonly _specificationDescription: string;
  private readonly _validationPriority: number;
  private readonly _failureCode: string;

  constructor(
    specificationName: string,
    specificationVersion: string,
    specificationDescription: string,
    validationPriority: number,
    failureCode: string,
  ) {
    this._specificationName = specificationName;
    this._specificationVersion = specificationVersion;
    this._specificationDescription = specificationDescription;
    this._validationPriority = validationPriority;
    this._failureCode = failureCode;
  }

  getSpecificationName(): string {
    return this._specificationName;
  }

  getSpecificationVersion(): string {
    return this._specificationVersion;
  }

  getSpecificationDescription(): string {
    return this._specificationDescription;
  }

  getValidationPriority(): number {
    return this._validationPriority;
  }

  getFailureCode(): string {
    return this._failureCode;
  }

  abstract isResultValid(value: number, computedResult: string): boolean;
}
