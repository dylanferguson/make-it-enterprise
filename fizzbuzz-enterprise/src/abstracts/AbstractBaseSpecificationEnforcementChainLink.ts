import type { ISpecificationEnforcementChainLink } from "../contracts/ISpecificationEnforcementChainLink.js";
import type { IFizzBuzzSpecification } from "../contracts/IFizzBuzzSpecification.js";

export abstract class AbstractBaseSpecificationEnforcementChainLink
  implements ISpecificationEnforcementChainLink
{
  protected next: ISpecificationEnforcementChainLink | null = null;

  abstract getChainLinkName(): string;
  abstract getChainLinkPriority(): number;

  setNext(
    next: ISpecificationEnforcementChainLink,
  ): ISpecificationEnforcementChainLink {
    this.next = next;
    return next;
  }

  abstract enforce(
    value: number,
    divisor: number,
    specification: IFizzBuzzSpecification | null,
  ): boolean;

  protected enforceNext(
    value: number,
    divisor: number,
    specification: IFizzBuzzSpecification | null,
  ): boolean {
    if (this.next !== null) {
      return this.next.enforce(value, divisor, specification);
    }
    return false;
  }
}
