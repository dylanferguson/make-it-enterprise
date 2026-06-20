import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";

export interface ISpecificationProviderStrategy {
  provideSpecification(divisor: number): IFizzBuzzSpecification | null;
  getProviderStrategyName(): string;
  getProviderStrategyVersion(): string;
  supportsDivisor(divisor: number): boolean;
}
