import { AbstractBaseComputationRequestInterceptionFilterChain } from "../../abstracts/AbstractBaseComputationRequestInterceptionFilterChain.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationRequestInterceptionFilter, IComputationRequestInterceptionFilterChain } from "../../contracts/IComputationRequestInterceptionFilter.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class ComputationRequestInterceptionFilterChainImpl
  extends AbstractBaseComputationRequestInterceptionFilterChain
{
  private static readonly CHAIN_NAME = "ComputationRequestInterceptionFilterChain";
  private static readonly CHAIN_VERSION = "1.0.0-ENTERPRISE-FILTER-CHAIN";

  private readonly terminatingFacade: IFizzBuzzSingleValueResolutionFacade;
  private chainBuilt: boolean = false;

  constructor(
    terminatingFacade: IFizzBuzzSingleValueResolutionFacade,
    filters?: IComputationRequestInterceptionFilter[],
  ) {
    super(
      ComputationRequestInterceptionFilterChainImpl.CHAIN_NAME,
      ComputationRequestInterceptionFilterChainImpl.CHAIN_VERSION,
    );
    this.terminatingFacade = terminatingFacade;
    if (filters !== undefined) {
      for (const filter of filters) {
        this.filters.push(filter);
      }
    }
  }

  override registerFilter(filter: IComputationRequestInterceptionFilter): void {
    this.filters.push(filter);
    this.chainBuilt = false;
  }

  override proceed(
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse {
    this.ensureChainBuilt();
    return this.invokeFilter(0, request);
  }

  private invokeFilter(
    position: number,
    request: IFizzBuzzComputationRequest,
  ): IFizzBuzzComputationResponse {
    if (position >= this.filters.length) {
      const result = this.terminatingFacade.resolveValue(request.getRequestedValue());
      return new FizzBuzzComputationResponseImpl(
        request.getRequestedValue(),
        result,
        `ifl:term:${request.getRequestId()}`,
        request.getRequestId(),
      );
    }
    const filter = this.filters[position]!;
    if (!filter.isFilterEnabled()) {
      return this.invokeFilter(position + 1, request);
    }
    const subChain: IComputationRequestInterceptionFilterChain = {
      proceed: (req: IFizzBuzzComputationRequest) =>
        this.invokeFilter(position + 1, req),
      getChainName: () => this.getChainName(),
      getChainVersion: () => this.getChainVersion(),
      getRegisteredFilterCount: () => this.filters.length,
      getRegisteredFilterNames: () => this.getRegisteredFilterNames(),
    };
    return filter.doFilter(request, subChain);
  }

  private ensureChainBuilt(): void {
    if (!this.chainBuilt) {
      this.sortFiltersByPriority();
      this.chainBuilt = true;
    }
  }
}
