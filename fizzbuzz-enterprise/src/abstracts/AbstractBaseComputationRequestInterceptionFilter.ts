import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";
import type { IComputationRequestInterceptionFilter, IComputationRequestInterceptionFilterChain } from "../contracts/IComputationRequestInterceptionFilter.js";

export abstract class AbstractBaseComputationRequestInterceptionFilter
  implements IComputationRequestInterceptionFilter
{
  protected static readonly FILTER_FRAMEWORK_VERSION = "1.0.0-INTERCEPTION-FILTER-FRAMEWORK";
  protected static readonly DEFAULT_FILTER_PRIORITY = 100;

  abstract doFilter(
    request: IFizzBuzzComputationRequest,
    chain: IComputationRequestInterceptionFilterChain,
  ): IFizzBuzzComputationResponse;

  abstract getFilterName(): string;
  abstract getFilterVersion(): string;

  abstract isFilterEnabled(): boolean;

  getFilterPriority(): number {
    return AbstractBaseComputationRequestInterceptionFilter.DEFAULT_FILTER_PRIORITY;
  }

  protected getFilterFrameworkVersion(): string {
    return AbstractBaseComputationRequestInterceptionFilter.FILTER_FRAMEWORK_VERSION;
  }

  protected validateRequest(request: IFizzBuzzComputationRequest): void {
    if (request === null) {
      throw new Error(
        `[${this.getFilterName()} v${this.getFilterVersion()}] Interception filter received null request`,
      );
    }
  }

  protected createFilterTraceId(request: IFizzBuzzComputationRequest): string {
    return `flt:${this.getFilterName()}:${request.getRequestId()}:${Date.now()}`;
  }
}
