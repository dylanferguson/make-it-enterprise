import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "./IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";
import type { IEnterpriseFizzBuzzResultValidationSpecification } from "./IEnterpriseFizzBuzzResultValidationSpecification.js";

export interface IEnterpriseFizzBuzzResultValidationSpecificationVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  getVisitationCount(): number;
  visitRegistry(registry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry): void;
  visitSpecification(specification: IEnterpriseFizzBuzzResultValidationSpecification): void;
  getLastVisitedSpecificationName(): string | null;
  getVisitedSpecificationNames(): readonly string[];
  resetVisitationState(): void;
}
