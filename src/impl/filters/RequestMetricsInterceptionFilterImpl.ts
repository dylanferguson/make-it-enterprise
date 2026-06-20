import { AbstractBaseComputationRequestInterceptionFilter } from "../../abstracts/AbstractBaseComputationRequestInterceptionFilter.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IComputationRequestInterceptionFilterChain } from "../../contracts/IComputationRequestInterceptionFilter.js";

export class RequestMetricsInterceptionFilterImpl extends AbstractBaseComputationRequestInterceptionFilter {
  private static readonly FILTER_NAME = "RequestMetricsInterceptionFilter";
  private static readonly FILTER_VERSION = "1.0.0-METRICS-FILTER";
  private static readonly FILTER_PRIORITY = 200;

  private totalRequestsProcessed: number = 0;
  private totalProcessingTimeMs: number = 0;
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
    const startTime = performance.now();
    const response = chain.proceed(request);
    const elapsedMs = performance.now() - startTime;
    this.totalRequestsProcessed++;
    this.totalProcessingTimeMs += elapsedMs;
    console.debug(
      `[${this.getFilterName()}] Request metrics: ` +
      `requestId=[${request.getRequestId()}], value=[${request.getRequestedValue()}], ` +
      `elapsedMs=[${elapsedMs.toFixed(3)}], avgMs=[${(this.totalProcessingTimeMs / this.totalRequestsProcessed).toFixed(3)}], ` +
      `totalProcessed=[${this.totalRequestsProcessed}]`,
    );
    return response;
  }

  override getFilterName(): string {
    return RequestMetricsInterceptionFilterImpl.FILTER_NAME;
  }

  override getFilterVersion(): string {
    return RequestMetricsInterceptionFilterImpl.FILTER_VERSION;
  }

  override getFilterPriority(): number {
    return RequestMetricsInterceptionFilterImpl.FILTER_PRIORITY;
  }

  override isFilterEnabled(): boolean {
    return this.filterEnabled;
  }

  setFilterEnabled(enabled: boolean): void {
    this.filterEnabled = enabled;
  }

  getTotalRequestsProcessed(): number {
    return this.totalRequestsProcessed;
  }

  getAverageProcessingTimeMs(): number {
    if (this.totalRequestsProcessed === 0) return 0;
    return this.totalProcessingTimeMs / this.totalRequestsProcessed;
  }
}
