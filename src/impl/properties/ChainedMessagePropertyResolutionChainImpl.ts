import { AbstractBaseMessagePropertyResolutionChain } from "../../abstracts/AbstractBaseMessagePropertyResolutionChain.js";

export class ChainedMessagePropertyResolutionChainImpl extends AbstractBaseMessagePropertyResolutionChain {
  private static readonly CHAIN_NAME = "ChainedMessagePropertyResolutionChain";
  private static readonly CHAIN_VERSION = "1.0.0-PROPERTY-RESOLUTION-CHAIN";

  override getChainName(): string {
    return ChainedMessagePropertyResolutionChainImpl.CHAIN_NAME;
  }

  override getChainVersion(): string {
    return ChainedMessagePropertyResolutionChainImpl.CHAIN_VERSION;
  }
}
