import { AbstractBaseEnterpriseComputationStrategySelectionChain } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectionChain.js";

export class EnterpriseComputationStrategySelectionChainImpl
  extends AbstractBaseEnterpriseComputationStrategySelectionChain
{
  private static readonly CHAIN_NAME = "EnterpriseComputationStrategySelectionChain";
  private static readonly CHAIN_VERSION = "1.0.0-SELECTION-CHAIN";

  getChainName(): string {
    return EnterpriseComputationStrategySelectionChainImpl.CHAIN_NAME;
  }

  getChainVersion(): string {
    return EnterpriseComputationStrategySelectionChainImpl.CHAIN_VERSION;
  }
}
