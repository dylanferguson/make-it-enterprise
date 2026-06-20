import type { IEnterpriseFizzBuzzResultValidationSpecificationFactory } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationFactory.js";
import type { IEnterpriseFizzBuzzResultValidationSpecification } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecification.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl
  implements IEnterpriseFizzBuzzResultValidationSpecificationFactory
{
  private readonly _factoryName: string;
  private readonly _factoryVersion: string;

  constructor(
    factoryName: string,
    factoryVersion: string,
  ) {
    this._factoryName = factoryName;
    this._factoryVersion = factoryVersion;
  }

  getFactoryName(): string {
    return this._factoryName;
  }

  getFactoryVersion(): string {
    return this._factoryVersion;
  }

  abstract createAlwaysValidSpecification(): IEnterpriseFizzBuzzResultValidationSpecification;
  abstract createLengthConstrainedSpecification(
    name: string,
    version: string,
    description: string,
    maxLength: number,
    priority: number,
  ): IEnterpriseFizzBuzzResultValidationSpecification;
  abstract createDivisibilityConsistencySpecification(
    name: string,
    version: string,
    description: string,
    divisor: number,
    expectedOutput: string,
    priority: number,
  ): IEnterpriseFizzBuzzResultValidationSpecification;
}
