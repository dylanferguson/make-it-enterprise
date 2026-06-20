import { AbstractBaseComputationRequestInterceptionFilter } from "../../abstracts/AbstractBaseComputationRequestInterceptionFilter.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IComputationRequestInterceptionFilterChain } from "../../contracts/IComputationRequestInterceptionFilter.js";

export class RequestAuditingInterceptionFilterImpl extends AbstractBaseComputationRequestInterceptionFilter {
  private static readonly FILTER_NAME = "RequestAuditingInterceptionFilter";
  private static readonly FILTER_VERSION = "1.0.0-AUDITING-FILTER";
  private static readonly FILTER_PRIORITY = 300;

  private totalRequestsAudited: number = 0;
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
    this.totalRequestsAudited++;
    const traceId = this.createFilterTraceId(request);
    console.debug(
      `[${this.getFilterName()}] Auditing computation request: ` +
      `id=[${request.getRequestId()}], value=[${request.getRequestedValue()}], ` +
      `origin=[${request.getRequestOrigin()}], traceId=[${traceId}], ` +
      `totalAudited=[${this.totalRequestsAudited}]`,
    );
    const response = chain.proceed(request);
    console.debug(
      `[${this.getFilterName()}] Computation response audited: ` +
      `responseId=[${response.getResponseId()}], result=[${response.getComputedResult()}], traceId=[${traceId}]`,
    );
    return response;
  }

  override getFilterName(): string {
    return RequestAuditingInterceptionFilterImpl.FILTER_NAME;
  }

  override getFilterVersion(): string {
    return RequestAuditingInterceptionFilterImpl.FILTER_VERSION;
  }

  override getFilterPriority(): number {
    return RequestAuditingInterceptionFilterImpl.FILTER_PRIORITY;
  }

  override isFilterEnabled(): boolean {
    return this.filterEnabled;
  }

  setFilterEnabled(enabled: boolean): void {
    this.filterEnabled = enabled;
  }

  getTotalRequestsAudited(): number {
    return this.totalRequestsAudited;
  }
}
