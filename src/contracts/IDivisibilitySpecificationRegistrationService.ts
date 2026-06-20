import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";

export interface IDivisibilitySpecificationRegistrationService {
  registerSpecificationForDivisor(
    divisor: number,
    specification: IFizzBuzzSpecification,
  ): void;
  registerDefaultSpecifications(): void;
  getRegistrationServiceName(): string;
  getRegistrationServiceVersion(): string;
}
