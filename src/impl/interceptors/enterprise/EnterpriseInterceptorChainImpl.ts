import type { IEnterpriseInterceptor, IEnterpriseInterceptorChain } from "../../../contracts/IEnterpriseInterceptor.js";
import type { ICompositeValueResolver } from "../../../contracts/ICompositeValueResolver.js";

export class EnterpriseInterceptorChainImpl implements IEnterpriseInterceptorChain {
  private readonly interceptors: IEnterpriseInterceptor[];
  private readonly resolver: ICompositeValueResolver;
  private currentIndex: number;

  constructor(interceptors: IEnterpriseInterceptor[], resolver: ICompositeValueResolver) {
    this.interceptors = [...interceptors].sort(
      (a, b) => b.getInterceptorPriority() - a.getInterceptorPriority(),
    );
    this.resolver = resolver;
    this.currentIndex = 0;
  }

  proceed(value: number): string {
    if (this.currentIndex >= this.interceptors.length) {
      return this.resolver.resolve(value);
    }
    const interceptor = this.interceptors[this.currentIndex]!;
    this.currentIndex++;
    return interceptor.intercept(value, this.resolver, this);
  }

  getRemainingInterceptorCount(): number {
    return Math.max(0, this.interceptors.length - this.currentIndex);
  }
}
