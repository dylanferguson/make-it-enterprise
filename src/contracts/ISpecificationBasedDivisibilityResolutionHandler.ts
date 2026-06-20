import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";

export interface ISpecificationBasedDivisibilityResolutionHandler {
  resolveDivisibilityBySpecification(
    dividend: number,
    divisor: number,
  ): boolean;
  getUnderlyingSpecification(
    divisor: number,
  ): IFizzBuzzSpecification | null;
  getHandlerName(): string;
  getHandlerVersion(): string;
}
