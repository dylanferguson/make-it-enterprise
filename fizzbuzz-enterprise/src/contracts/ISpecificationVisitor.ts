import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";

export interface ISpecificationVisitor {
  visitDivisibleBySpecification(
    specification: IFizzBuzzSpecification,
    divisor: number,
  ): void;
  visitCompositeSpecification(
    specification: IFizzBuzzSpecification,
    childSpecifications: readonly IFizzBuzzSpecification[],
  ): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
}
