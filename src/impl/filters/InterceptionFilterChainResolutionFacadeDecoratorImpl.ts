import { AbstractBaseInterceptionFilterChainResolutionFacadeDecorator } from "../../abstracts/AbstractBaseInterceptionFilterChainResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationRequestInterceptionFilterChain } from "../../contracts/IComputationRequestInterceptionFilter.js";
import type { IFizzBuzzComputationRequestBuilder } from "../../contracts/IFizzBuzzComputationRequestBuilder.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import { FizzBuzzComputationRequestBuilderImpl } from "../builders/FizzBuzzComputationRequestBuilderImpl.js";

export class InterceptionFilterChainResolutionFacadeDecoratorImpl
  extends AbstractBaseInterceptionFilterChainResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "InterceptionFilterChainResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-INTERCEPTION-DECORATOR";
  private static readonly FACADE_NAME = "InterceptionFilterChainResolutionFacade";
  private static readonly FACADE_VERSION = "1.0.0-INTERCEPTION-FACADE";
  private static readonly REQUEST_ORIGIN = "InterceptionFilterChainResolutionFacadeDecorator";
  private static readonly DEFAULT_REQUEST_ID_PREFIX = "ifl:req:value";

  private readonly requestBuilder: IFizzBuzzComputationRequestBuilder;
  private filterChainEnabled: boolean = true;

  constructor(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    interceptionFilterChain: IComputationRequestInterceptionFilterChain,
    requestBuilder?: IFizzBuzzComputationRequestBuilder,
    filterChainEnabled?: boolean,
  ) {
    super(decoratedFacade, interceptionFilterChain);
    this.requestBuilder = requestBuilder ?? new FizzBuzzComputationRequestBuilderImpl();
    if (filterChainEnabled !== undefined) {
      this.filterChainEnabled = filterChainEnabled;
    }
  }

  override resolveValue(value: number): string {
    this.validateResolutionValue(value);
    if (!this.isFilterChainEnabled()) {
      return this.decoratedFacade.resolveValue(value);
    }
    const request = this.buildInterceptionRequest(value);
    const response = this.interceptionFilterChain.proceed(request);
    return response.getComputedResult();
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.validateRangeBounds(start, end);
    const responses: string[] = [];
    for (let i = start; i <= end; i++) {
      if (!this.isFilterChainEnabled()) {
        responses.push(this.decoratedFacade.resolveValue(i));
      } else {
        const request = this.buildRangeInterceptionRequest(i, start, end);
        const response = this.interceptionFilterChain.proceed(request);
        responses.push(response.getComputedResult());
      }
    }
    return responses;
  }

  override getFacadeName(): string {
    return InterceptionFilterChainResolutionFacadeDecoratorImpl.FACADE_NAME;
  }

  override getFacadeVersion(): string {
    return InterceptionFilterChainResolutionFacadeDecoratorImpl.FACADE_VERSION;
  }

  override getDecoratorName(): string {
    return InterceptionFilterChainResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return InterceptionFilterChainResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override isFilterChainEnabled(): boolean {
    return this.filterChainEnabled;
  }

  setFilterChainEnabled(enabled: boolean): void {
    this.filterChainEnabled = enabled;
  }

  private buildInterceptionRequest(value: number): IFizzBuzzComputationRequest {
    return this.requestBuilder
      .reset()
      .withRequestedValue(value)
      .withRequestOrigin(InterceptionFilterChainResolutionFacadeDecoratorImpl.REQUEST_ORIGIN)
      .withRequestIdPrefix(InterceptionFilterChainResolutionFacadeDecoratorImpl.DEFAULT_REQUEST_ID_PREFIX)
      .build();
  }

  private buildRangeInterceptionRequest(
    value: number,
    rangeStart: number,
    rangeEnd: number,
  ): IFizzBuzzComputationRequest {
    return this.requestBuilder
      .reset()
      .withRequestedValue(value)
      .withRequestOrigin(InterceptionFilterChainResolutionFacadeDecoratorImpl.REQUEST_ORIGIN)
      .withRequestIdPrefix(`ifl:req:range:${rangeStart}:${rangeEnd}:idx`)
      .build();
  }

  private validateResolutionValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.getFacadeName()} v${this.getFacadeVersion()}] Invalid resolution value: ${value}. Must be a finite non-negative number.`,
      );
    }
  }

  private validateRangeBounds(start: number, end: number): void {
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      throw new Error(
        `[${this.getFacadeName()}] Range bounds must be finite: start=${start}, end=${end}`,
      );
    }
    if (start > end) {
      throw new Error(
        `[${this.getFacadeName()}] Range start (${start}) must not exceed end (${end})`,
      );
    }
    const rangeSize = end - start + 1;
    if (rangeSize > 1000000) {
      throw new Error(
        `[${this.getFacadeName()}] Range size ${rangeSize} exceeds maximum of 1000000`,
      );
    }
  }
}
