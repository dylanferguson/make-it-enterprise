import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IComputationRequestInterceptionFilter {
  doFilter(
    request: IFizzBuzzComputationRequest,
    chain: IComputationRequestInterceptionFilterChain,
  ): IFizzBuzzComputationResponse;
  getFilterName(): string;
  getFilterVersion(): string;
  getFilterPriority(): number;
  isFilterEnabled(): boolean;
}

export interface IComputationRequestInterceptionFilterChain {
  proceed(
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse;
  getChainName(): string;
  getChainVersion(): string;
  getRegisteredFilterCount(): number;
  getRegisteredFilterNames(): readonly string[];
}
