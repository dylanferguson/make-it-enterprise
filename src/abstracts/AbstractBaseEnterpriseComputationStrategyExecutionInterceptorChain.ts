import type { IEnterpriseComputationStrategyExecutionInterceptorChain } from "../contracts/IEnterpriseComputationStrategyExecutionInterceptorChain.js";
import type { IEnterpriseComputationStrategyExecutionInterceptor } from "../contracts/IEnterpriseComputationStrategyExecutionInterceptor.js";

export abstract class AbstractBaseEnterpriseComputationStrategyExecutionInterceptorChain
  implements IEnterpriseComputationStrategyExecutionInterceptorChain
{
  protected readonly interceptors: IEnterpriseComputationStrategyExecutionInterceptor[] = [];

  abstract getInterceptorChainName(): string;
  abstract getInterceptorChainVersion(): string;

  addInterceptor(interceptor: IEnterpriseComputationStrategyExecutionInterceptor): void {
    this.interceptors.push(interceptor);
    this.interceptors.sort((a, b) => a.getInterceptorOrder() - b.getInterceptorOrder());
  }

  removeInterceptor(interceptorName: string): boolean {
    const index = this.interceptors.findIndex(i => i.getInterceptorName() === interceptorName);
    if (index !== -1) {
      this.interceptors.splice(index, 1);
      return true;
    }
    return false;
  }

  getInterceptors(): readonly IEnterpriseComputationStrategyExecutionInterceptor[] {
    return [...this.interceptors];
  }
}
