import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseFizzBuzzComputationResponse implements IFizzBuzzComputationResponse {
  protected readonly resolvedValue: number;
  protected readonly computedResult: string;
  protected readonly responseId: string;
  protected readonly correlationRequestId: string;
  protected readonly responseTimestamp: Date;
  protected computationDurationMs: number;
  protected responseStatusCode: number;

  constructor(
    resolvedValue: number,
    computedResult: string,
    responseId: string,
    correlationRequestId: string,
    responseStatusCode: number = 200,
  ) {
    this.resolvedValue = resolvedValue;
    this.computedResult = computedResult;
    this.responseId = responseId;
    this.correlationRequestId = correlationRequestId;
    this.responseTimestamp = new Date();
    this.computationDurationMs = 0;
    this.responseStatusCode = responseStatusCode;
  }

  abstract getResolvedValue(): number;
  abstract getComputedResult(): string;
  abstract getResponseId(): string;
  abstract getCorrelationRequestId(): string;
  abstract getResponseTimestamp(): Date;
  abstract getComputationDurationMs(): number;
  abstract setComputationDurationMs(durationMs: number): void;
  abstract getResponseStatusCode(): number;
  abstract setResponseStatusCode(statusCode: number): void;
  abstract toResponsePayload(): Record<string, unknown>;
}
