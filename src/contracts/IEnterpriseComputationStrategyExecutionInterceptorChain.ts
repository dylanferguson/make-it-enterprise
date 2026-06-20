import type { IEnterpriseComputationStrategyExecutionInterceptor } from "./IEnterpriseComputationStrategyExecutionInterceptor.js";

export interface IEnterpriseComputationStrategyExecutionInterceptorChain {
  addInterceptor(interceptor: IEnterpriseComputationStrategyExecutionInterceptor): void;
  removeInterceptor(interceptorName: string): boolean;
  getInterceptors(): readonly IEnterpriseComputationStrategyExecutionInterceptor[];
  getInterceptorChainName(): string;
  getInterceptorChainVersion(): string;
}
