import { AbstractBaseComputationRequestInterceptionFilter } from "../../abstracts/AbstractBaseComputationRequestInterceptionFilter.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IComputationRequestInterceptionFilterChain } from "../../contracts/IComputationRequestInterceptionFilter.js";

export class RequestValidationInterceptionFilterImpl extends AbstractBaseComputationRequestInterceptionFilter {
  private static readonly FILTER_NAME = "RequestValidationInterceptionFilter";
  private static readonly FILTER_VERSION = "1.0.0-VALIDATION-FILTER";
  private static readonly FILTER_PRIORITY = 400;
  private static readonly MAX_REQUEST_VALUE = 1000000000;
  private static readonly MIN_REQUEST_VALUE = 0;

  private totalRejectedRequests: number = 0;
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
    const value = request.getRequestedValue();
    if (
      !Number.isFinite(value) ||
      value < RequestValidationInterceptionFilterImpl.MIN_REQUEST_VALUE ||
      value > RequestValidationInterceptionFilterImpl.MAX_REQUEST_VALUE
    ) {
      this.totalRejectedRequests++;
      throw new Error(
        `[${this.getFilterName()}] Request validation failed: value=[${value}], ` +
        `must be between [${RequestValidationInterceptionFilterImpl.MIN_REQUEST_VALUE}] and [${RequestValidationInterceptionFilterImpl.MAX_REQUEST_VALUE}], ` +
        `requestId=[${request.getRequestId()}], totalRejected=[${this.totalRejectedRequests}]`,
      );
    }
    return chain.proceed(request);
  }

  override getFilterName(): string {
    return RequestValidationInterceptionFilterImpl.FILTER_NAME;
  }

  override getFilterVersion(): string {
    return RequestValidationInterceptionFilterImpl.FILTER_VERSION;
  }

  override getFilterPriority(): number {
    return RequestValidationInterceptionFilterImpl.FILTER_PRIORITY;
  }

  override isFilterEnabled(): boolean {
    return this.filterEnabled;
  }

  setFilterEnabled(enabled: boolean): void {
    this.filterEnabled = enabled;
  }

  getTotalRejectedRequests(): number {
    return this.totalRejectedRequests;
  }
}
