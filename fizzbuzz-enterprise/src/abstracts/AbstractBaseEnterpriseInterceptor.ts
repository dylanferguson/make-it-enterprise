import type { IEnterpriseInterceptor, IEnterpriseInterceptorChain } from "../contracts/IEnterpriseInterceptor.js";
import type { ICompositeValueResolver } from "../contracts/ICompositeValueResolver.js";

export abstract class AbstractBaseEnterpriseInterceptor implements IEnterpriseInterceptor {
  abstract intercept(
    value: number,
    resolver: ICompositeValueResolver,
    invocationChain: IEnterpriseInterceptorChain,
  ): string;
  abstract getInterceptorName(): string;
  abstract getInterceptorPriority(): number;
}
