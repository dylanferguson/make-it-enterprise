import { AbstractBaseSpecificationEnforcementChain } from "../../abstracts/AbstractBaseSpecificationEnforcementChain.js";

export class StandardSpecificationEnforcementChainImpl extends AbstractBaseSpecificationEnforcementChain {
  private static readonly CHAIN_NAME = "StandardSpecificationEnforcementChain";
  private static readonly CHAIN_VERSION = "1.0.0-ENFORCEMENT-CHAIN";

  override getChainName(): string {
    return StandardSpecificationEnforcementChainImpl.CHAIN_NAME;
  }

  override getChainVersion(): string {
    return StandardSpecificationEnforcementChainImpl.CHAIN_VERSION;
  }

  protected override defaultEnforcement(
    _value: number,
    _divisor: number,
  ): boolean {
    return false;
  }
}
