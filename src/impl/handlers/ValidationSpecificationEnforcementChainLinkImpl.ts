import { AbstractBaseSpecificationEnforcementChainLink } from "../../abstracts/AbstractBaseSpecificationEnforcementChainLink.js";
import type { IFizzBuzzSpecification } from "../../contracts/IFizzBuzzSpecification.js";

export class ValidationSpecificationEnforcementChainLinkImpl extends AbstractBaseSpecificationEnforcementChainLink {
  private static readonly CHAIN_LINK_NAME = "ValidationSpecificationEnforcementChainLink";
  private static readonly CHAIN_LINK_PRIORITY = 100;

  override getChainLinkName(): string {
    return ValidationSpecificationEnforcementChainLinkImpl.CHAIN_LINK_NAME;
  }

  override getChainLinkPriority(): number {
    return ValidationSpecificationEnforcementChainLinkImpl.CHAIN_LINK_PRIORITY;
  }

  override enforce(
    value: number,
    divisor: number,
    specification: IFizzBuzzSpecification | null,
  ): boolean {
    if (!Number.isFinite(value) || !Number.isFinite(divisor)) {
      throw new Error(
        `[${this.getChainLinkName()}] Invalid operands: value=${value}, divisor=${divisor}`,
      );
    }
    if (divisor <= 0) {
      throw new Error(
        `[${this.getChainLinkName()}] Non-positive divisor: ${divisor}`,
      );
    }
    return this.enforceNext(value, divisor, specification);
  }
}
