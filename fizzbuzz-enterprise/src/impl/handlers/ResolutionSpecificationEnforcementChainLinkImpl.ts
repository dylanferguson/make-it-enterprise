import { AbstractBaseSpecificationEnforcementChainLink } from "../../abstracts/AbstractBaseSpecificationEnforcementChainLink.js";
import type { IFizzBuzzSpecification } from "../../contracts/IFizzBuzzSpecification.js";

export class ResolutionSpecificationEnforcementChainLinkImpl extends AbstractBaseSpecificationEnforcementChainLink {
  private static readonly CHAIN_LINK_NAME = "ResolutionSpecificationEnforcementChainLink";
  private static readonly CHAIN_LINK_PRIORITY = 0;

  override getChainLinkName(): string {
    return ResolutionSpecificationEnforcementChainLinkImpl.CHAIN_LINK_NAME;
  }

  override getChainLinkPriority(): number {
    return ResolutionSpecificationEnforcementChainLinkImpl.CHAIN_LINK_PRIORITY;
  }

  override enforce(
    value: number,
    divisor: number,
    specification: IFizzBuzzSpecification | null,
  ): boolean {
    if (specification !== null) {
      return specification.isSatisfiedBy(value);
    }
    return this.enforceNext(value, divisor, specification);
  }
}
