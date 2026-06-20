import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";

export interface IDivisibilityValidationEnforcementSpecificationProvider {
  resolveValidationSpecification(
    divisor: number,
    specificationCategory: string,
  ): IFizzBuzzSpecification;
  registerValidationSpecification(
    divisor: number,
    specificationCategory: string,
    specification: IFizzBuzzSpecification,
  ): void;
  getProviderName(): string;
  getProviderVersion(): string;
  getRegisteredSpecificationCategories(): readonly string[];
}
