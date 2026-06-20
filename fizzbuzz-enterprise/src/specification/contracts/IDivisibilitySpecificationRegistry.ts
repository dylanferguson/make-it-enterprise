import type { IDivisibilitySpecificationStrategy } from "./IDivisibilitySpecificationStrategy.js";

export interface IDivisibilitySpecificationRegistry {
  registerSpecification(name: string, specification: IDivisibilitySpecificationStrategy): void;
  getSpecification(name: string): IDivisibilitySpecificationStrategy | null;
  getSpecificationForDivisor(divisor: number): IDivisibilitySpecificationStrategy | null;
  getRegisteredSpecificationNames(): readonly string[];
  getRegistryName(): string;
  getRegistryVersion(): string;
}
