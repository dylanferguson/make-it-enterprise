import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IFizzBuzzComputationResponseBuilder {
  withResolvedValue(value: number): IFizzBuzzComputationResponseBuilder;
  withComputedResult(result: string): IFizzBuzzComputationResponseBuilder;
  withCorrelationRequestId(correlationId: string): IFizzBuzzComputationResponseBuilder;
  withResponseStatusCode(statusCode: number): IFizzBuzzComputationResponseBuilder;
  withComputationDurationMs(durationMs: number): IFizzBuzzComputationResponseBuilder;
  build(): IFizzBuzzComputationResponse;
  reset(): IFizzBuzzComputationResponseBuilder;
  getBuilderName(): string;
  getBuilderVersion(): string;
}
