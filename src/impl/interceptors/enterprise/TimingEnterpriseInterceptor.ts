import type { ICompositeValueResolver } from "../../../contracts/ICompositeValueResolver.js";
import type { IEnterpriseInterceptor, IEnterpriseInterceptorChain } from "../../../contracts/IEnterpriseInterceptor.js";

export class TimingEnterpriseInterceptor implements IEnterpriseInterceptor {
  private static readonly INTERCEPTOR_NAME = "TimingEnterpriseInterceptor";
  private static readonly INTERCEPTOR_PRIORITY = 75;

  intercept(
    value: number,
    resolver: ICompositeValueResolver,
    invocationChain: IEnterpriseInterceptorChain,
  ): string {
    const startTime = performance.now();
    const result = invocationChain.proceed(value);
    const elapsedMs = performance.now() - startTime;
    console.debug(`[${TimingEnterpriseInterceptor.INTERCEPTOR_NAME}] Resolve of ${value} took ${elapsedMs.toFixed(3)}ms`);
    return result;
  }

  getInterceptorName(): string {
    return TimingEnterpriseInterceptor.INTERCEPTOR_NAME;
  }

  getInterceptorPriority(): number {
    return TimingEnterpriseInterceptor.INTERCEPTOR_PRIORITY;
  }
}
