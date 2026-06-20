import type { IFizzBuzzComputationRequestBuilder } from "../contracts/IFizzBuzzComputationRequestBuilder.js";

export abstract class AbstractBaseFizzBuzzComputationRequestBuilder implements IFizzBuzzComputationRequestBuilder {
  protected requestedValue: number = 0;
  protected requestOrigin: string = "FizzBuzzComputationRequestBuilder";
  protected computationContext: string = "STANDARD_COMPUTATION_CONTEXT";
  protected requestIdPrefix: string = "req:builder";

  abstract withRequestedValue(value: number): IFizzBuzzComputationRequestBuilder;
  abstract withRequestOrigin(origin: string): IFizzBuzzComputationRequestBuilder;
  abstract withComputationContext(context: string): IFizzBuzzComputationRequestBuilder;
  abstract withRequestIdPrefix(prefix: string): IFizzBuzzComputationRequestBuilder;
  abstract build(): ReturnType<IFizzBuzzComputationRequestBuilder["build"]>;
  abstract reset(): IFizzBuzzComputationRequestBuilder;
  abstract getBuilderName(): string;
  abstract getBuilderVersion(): string;

  protected generateRequestId(): string {
    return `${this.requestIdPrefix}:${this.requestedValue}:${Date.now()}:${Math.random().toString(36).substring(2, 8)}`;
  }

  protected resetInternals(): void {
    this.requestedValue = 0;
    this.requestOrigin = "FizzBuzzComputationRequestBuilder";
    this.computationContext = "STANDARD_COMPUTATION_CONTEXT";
    this.requestIdPrefix = "req:builder";
  }
}
