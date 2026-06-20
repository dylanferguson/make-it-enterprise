import { AbstractBaseEnterpriseComputationStrategyExecutionInterceptorChain } from "../../abstracts/AbstractBaseEnterpriseComputationStrategyExecutionInterceptorChain.js";

export class EnterpriseComputationStrategyExecutionInterceptorChainImpl
  extends AbstractBaseEnterpriseComputationStrategyExecutionInterceptorChain
{
  private static readonly CHAIN_NAME = "EnterpriseComputationStrategyExecutionInterceptorChain";
  private static readonly CHAIN_VERSION = "1.0.0-INTERCEPTOR-CHAIN";

  getInterceptorChainName(): string {
    return EnterpriseComputationStrategyExecutionInterceptorChainImpl.CHAIN_NAME;
  }

  getInterceptorChainVersion(): string {
    return EnterpriseComputationStrategyExecutionInterceptorChainImpl.CHAIN_VERSION;
  }
}
