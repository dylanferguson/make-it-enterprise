import type { IEnterpriseFizzBuzzResultValidationSpecification } from "./IEnterpriseFizzBuzzResultValidationSpecification.js";

export interface IEnterpriseFizzBuzzResultValidationSpecificationRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerSpecification(
    specification: IEnterpriseFizzBuzzResultValidationSpecification,
  ): void;
  unregisterSpecification(specificationName: string): boolean;
  resolveSpecification(specificationName: string): IEnterpriseFizzBuzzResultValidationSpecification | null;
  resolveSpecificationsByPriority(): readonly IEnterpriseFizzBuzzResultValidationSpecification[];
  getRegisteredSpecificationNames(): readonly string[];
  getRegisteredSpecificationCount(): number;
  validateResult(value: number, computedResult: string): { valid: boolean; failures: readonly string[] };
  isRegistryActive(): boolean;
}
