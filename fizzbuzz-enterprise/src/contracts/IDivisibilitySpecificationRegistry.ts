import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";

export interface IDivisibilitySpecificationRegistry {
  registerDivisibilitySpecification(
    divisor: number,
    specification: IFizzBuzzSpecification,
  ): void;
  resolveDivisibilitySpecification(
    divisor: number,
  ): IFizzBuzzSpecification | null;
  getRegisteredDivisors(): readonly number[];
  getRegistryName(): string;
  getRegistryVersion(): string;
}
