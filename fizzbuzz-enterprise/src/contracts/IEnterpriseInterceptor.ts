import type { ICompositeValueResolver } from "./ICompositeValueResolver.js";

export interface IEnterpriseInterceptor {
  intercept(
    value: number,
    resolver: ICompositeValueResolver,
    invocationChain: IEnterpriseInterceptorChain,
  ): string;
  getInterceptorName(): string;
  getInterceptorPriority(): number;
}

export interface IEnterpriseInterceptorChain {
  proceed(value: number): string;
  getRemainingInterceptorCount(): number;
}
