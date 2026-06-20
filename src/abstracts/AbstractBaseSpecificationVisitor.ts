import type { ISpecificationVisitor } from "../contracts/ISpecificationVisitor.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseSpecificationVisitor
  implements ISpecificationVisitor
{
  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;

  abstract visitDivisibleBySpecification(
    specification: IFizzBuzzSpecification,
    divisor: number,
  ): void;

  abstract visitCompositeSpecification(
    specification: IFizzBuzzSpecification,
    childSpecifications: readonly IFizzBuzzSpecification[],
  ): void;
}
