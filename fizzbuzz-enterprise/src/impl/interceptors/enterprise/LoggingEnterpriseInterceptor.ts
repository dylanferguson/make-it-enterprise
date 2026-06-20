import { AbstractBaseEnterpriseInterceptor } from "../../../abstracts/AbstractBaseEnterpriseInterceptor.js";
import type { IEnterpriseInterceptorChain } from "../../../contracts/IEnterpriseInterceptor.js";
import type { ICompositeValueResolver } from "../../../contracts/ICompositeValueResolver.js";

export class LoggingEnterpriseInterceptor extends AbstractBaseEnterpriseInterceptor {
  private static readonly INTERCEPTOR_NAME = "LoggingEnterpriseInterceptor";
  private static readonly INTERCEPTOR_PRIORITY = 50;

  override intercept(
    value: number,
    resolver: ICompositeValueResolver,
    invocationChain: IEnterpriseInterceptorChain,
  ): string {
    console.debug(`[${LoggingEnterpriseInterceptor.INTERCEPTOR_NAME}] Before resolve: ${value}`);
    const result = invocationChain.proceed(value);
    console.debug(`[${LoggingEnterpriseInterceptor.INTERCEPTOR_NAME}] After resolve: ${value} -> "${result}"`);
    return result;
  }

  override getInterceptorName(): string {
    return LoggingEnterpriseInterceptor.INTERCEPTOR_NAME;
  }

  override getInterceptorPriority(): number {
    return LoggingEnterpriseInterceptor.INTERCEPTOR_PRIORITY;
  }
}
