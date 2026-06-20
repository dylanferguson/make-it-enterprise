import type { IFizzBuzzSpecification } from "./IFizzBuzzSpecification.js";

export interface ISpecificationEnforcementChainLink {
  setNext(
    next: ISpecificationEnforcementChainLink,
  ): ISpecificationEnforcementChainLink;
  enforce(
    value: number,
    divisor: number,
    specification: IFizzBuzzSpecification | null,
  ): boolean;
  getChainLinkName(): string;
  getChainLinkPriority(): number;
}
