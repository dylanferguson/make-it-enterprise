import type { IFizzBuzzComputationResponseBuilder } from "../contracts/IFizzBuzzComputationResponseBuilder.js";

export abstract class AbstractBaseFizzBuzzComputationResponseBuilder implements IFizzBuzzComputationResponseBuilder {
  protected resolvedValue: number = 0;
  protected computedResult: string = "";
  protected correlationRequestId: string = "";
  protected responseStatusCode: number = 200;
  protected computationDurationMs: number = 0;

  abstract withResolvedValue(value: number): IFizzBuzzComputationResponseBuilder;
  abstract withComputedResult(result: string): IFizzBuzzComputationResponseBuilder;
  abstract withCorrelationRequestId(correlationId: string): IFizzBuzzComputationResponseBuilder;
  abstract withResponseStatusCode(statusCode: number): IFizzBuzzComputationResponseBuilder;
  abstract withComputationDurationMs(durationMs: number): IFizzBuzzComputationResponseBuilder;
  abstract build(): ReturnType<IFizzBuzzComputationResponseBuilder["build"]>;
  abstract reset(): IFizzBuzzComputationResponseBuilder;
  abstract getBuilderName(): string;
  abstract getBuilderVersion(): string;

  protected generateResponseId(): string {
    return `resp:${this.correlationRequestId}:${Date.now()}`;
  }

  protected resetInternals(): void {
    this.resolvedValue = 0;
    this.computedResult = "";
    this.correlationRequestId = "";
    this.responseStatusCode = 200;
    this.computationDurationMs = 0;
  }
}
