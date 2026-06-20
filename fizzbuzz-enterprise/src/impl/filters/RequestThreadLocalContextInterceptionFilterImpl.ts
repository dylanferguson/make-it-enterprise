import { AbstractBaseComputationRequestInterceptionFilter } from "../../abstracts/AbstractBaseComputationRequestInterceptionFilter.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IComputationRequestInterceptionFilterChain } from "../../contracts/IComputationRequestInterceptionFilter.js";

export class RequestThreadLocalContextInterceptionFilterImpl extends AbstractBaseComputationRequestInterceptionFilter {
  private static readonly FILTER_NAME = "RequestThreadLocalContextInterceptionFilter";
  private static readonly FILTER_VERSION = "1.0.0-THREADLOCAL-FILTER";
  private static readonly FILTER_PRIORITY = 500;
  private static readonly threadLocalContext = new Map<string, unknown>();

  private filterEnabled: boolean = true;

  constructor(filterEnabled?: boolean) {
    super();
    if (filterEnabled !== undefined) {
      this.filterEnabled = filterEnabled;
    }
  }

  override doFilter(
    request: IFizzBuzzComputationRequest,
    chain: IComputationRequestInterceptionFilterChain,
  ): IFizzBuzzComputationResponse {
    this.validateRequest(request);
    const contextKey = `ctx:${request.getRequestId()}`;
    const correlationId = `corr:${request.getRequestOrigin()}:${request.getRequestId()}:${Date.now()}`;
    RequestThreadLocalContextInterceptionFilterImpl.threadLocalContext.set(contextKey, {
      correlationId,
      requestId: request.getRequestId(),
      requestOrigin: request.getRequestOrigin(),
      requestValue: request.getRequestedValue(),
      timestamp: Date.now(),
    });
    try {
      console.debug(
        `[${this.getFilterName()}] Thread-local context propagated: ` +
        `contextKey=[${contextKey}], correlationId=[${correlationId}]`,
      );
      return chain.proceed(request);
    } finally {
      RequestThreadLocalContextInterceptionFilterImpl.threadLocalContext.delete(contextKey);
    }
  }

  override getFilterName(): string {
    return RequestThreadLocalContextInterceptionFilterImpl.FILTER_NAME;
  }

  override getFilterVersion(): string {
    return RequestThreadLocalContextInterceptionFilterImpl.FILTER_VERSION;
  }

  override getFilterPriority(): number {
    return RequestThreadLocalContextInterceptionFilterImpl.FILTER_PRIORITY;
  }

  override isFilterEnabled(): boolean {
    return this.filterEnabled;
  }

  setFilterEnabled(enabled: boolean): void {
    this.filterEnabled = enabled;
  }

  static getThreadLocalContextSize(): number {
    return RequestThreadLocalContextInterceptionFilterImpl.threadLocalContext.size;
  }
}
