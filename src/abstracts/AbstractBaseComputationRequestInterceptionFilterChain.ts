import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";
import type { IComputationRequestInterceptionFilter, IComputationRequestInterceptionFilterChain } from "../contracts/IComputationRequestInterceptionFilter.js";

export abstract class AbstractBaseComputationRequestInterceptionFilterChain
  implements IComputationRequestInterceptionFilterChain
{
  protected static readonly CHAIN_FRAMEWORK_VERSION = "1.0.0-INTERCEPTION-FILTER-CHAIN-FRAMEWORK";
  protected static readonly DEFAULT_CHAIN_NAME = "AbstractBaseComputationRequestInterceptionFilterChain";
  protected static readonly DEFAULT_CHAIN_VERSION = "1.0.0-FILTER-CHAIN";

  protected readonly filters: IComputationRequestInterceptionFilter[] = [];
  protected readonly chainName: string;
  protected readonly chainVersion: string;

  constructor(
    chainName: string = AbstractBaseComputationRequestInterceptionFilterChain.DEFAULT_CHAIN_NAME,
    chainVersion: string = AbstractBaseComputationRequestInterceptionFilterChain.DEFAULT_CHAIN_VERSION,
  ) {
    this.chainName = chainName;
    this.chainVersion = chainVersion;
  }

  abstract proceed(
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse;

  getChainName(): string {
    return this.chainName;
  }

  getChainVersion(): string {
    return this.chainVersion;
  }

  getRegisteredFilterCount(): number {
    return this.filters.length;
  }

  getRegisteredFilterNames(): readonly string[] {
    return this.filters.map((f) => f.getFilterName());
  }

  protected registerFilter(filter: IComputationRequestInterceptionFilter): void {
    this.filters.push(filter);
  }

  protected sortFiltersByPriority(): void {
    this.filters.sort((a, b) => b.getFilterPriority() - a.getFilterPriority());
  }

  protected getChainFrameworkVersion(): string {
    return AbstractBaseComputationRequestInterceptionFilterChain.CHAIN_FRAMEWORK_VERSION;
  }
}
