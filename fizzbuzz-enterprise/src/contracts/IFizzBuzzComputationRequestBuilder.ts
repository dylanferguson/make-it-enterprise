import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";

export interface IFizzBuzzComputationRequestBuilder {
  withRequestedValue(value: number): IFizzBuzzComputationRequestBuilder;
  withRequestOrigin(origin: string): IFizzBuzzComputationRequestBuilder;
  withComputationContext(context: string): IFizzBuzzComputationRequestBuilder;
  withRequestIdPrefix(prefix: string): IFizzBuzzComputationRequestBuilder;
  build(): IFizzBuzzComputationRequest;
  reset(): IFizzBuzzComputationRequestBuilder;
  getBuilderName(): string;
  getBuilderVersion(): string;
}
