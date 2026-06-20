import type { IEnterpriseFizzBuzzResultValidationSpecification } from "./IEnterpriseFizzBuzzResultValidationSpecification.js";

export interface IEnterpriseFizzBuzzResultValidationSpecificationFactory {
  getFactoryName(): string;
  getFactoryVersion(): string;
  createAlwaysValidSpecification(): IEnterpriseFizzBuzzResultValidationSpecification;
  createLengthConstrainedSpecification(
    name: string,
    version: string,
    description: string,
    maxLength: number,
    priority: number,
  ): IEnterpriseFizzBuzzResultValidationSpecification;
  createDivisibilityConsistencySpecification(
    name: string,
    version: string,
    description: string,
    divisor: number,
    expectedOutput: string,
    priority: number,
  ): IEnterpriseFizzBuzzResultValidationSpecification;
}
