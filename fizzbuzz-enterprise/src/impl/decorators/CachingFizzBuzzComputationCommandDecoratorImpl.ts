import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";

export class CachingFizzBuzzComputationCommandDecoratorImpl extends AbstractBaseFizzBuzzComputationCommandDecorator {
  private static readonly DECORATOR_NAME = "CachingFizzBuzzComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DECORATOR";
  private static readonly COMMAND_NAME = "CachingFizzBuzzComputationCommand";
  private static readonly COMMAND_VERSION = "1.0.0-CACHING-COMMAND";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_VALUE_RESOLUTION_CACHING";

  private readonly cache: Map<number, IFizzBuzzComputationResponse> = new Map();
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  constructor(wrappedCommand: IFizzBuzzComputationCommand) {
    super(wrappedCommand);
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    const value = request.getRequestedValue();
    const cached = this.cache.get(value);
    if (cached !== undefined) {
      this.cacheHits++;
      const clonedResponse = new FizzBuzzComputationResponseImpl(
        cached.getResolvedValue(),
        cached.getComputedResult(),
        `${cached.getResponseId()}::cache-hit`,
        cached.getCorrelationRequestId(),
      );
      clonedResponse.setComputationDurationMs(0);
      clonedResponse.setResponseStatusCode(200);
      return clonedResponse;
    }
    this.cacheMisses++;
    const response = this.wrappedCommand.execute(request);
    this.cache.set(value, response);
    return response;
  }

  override getCommandName(): string {
    return CachingFizzBuzzComputationCommandDecoratorImpl.COMMAND_NAME;
  }

  override getCommandVersion(): string {
    return CachingFizzBuzzComputationCommandDecoratorImpl.COMMAND_VERSION;
  }

  override canExecute(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }

  override getCommandGroup(): string {
    return CachingFizzBuzzComputationCommandDecoratorImpl.COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return CachingFizzBuzzComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return CachingFizzBuzzComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  getCacheHits(): number {
    return this.cacheHits;
  }

  getCacheMisses(): number {
    return this.cacheMisses;
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }
}
