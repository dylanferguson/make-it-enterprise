import { AbstractBaseFizzBuzzComputationResponse } from "../../abstracts/AbstractBaseFizzBuzzComputationResponse.js";

export class FizzBuzzComputationResponseImpl extends AbstractBaseFizzBuzzComputationResponse {
  private static readonly RESPONSE_PAYLOAD_VERSION = "1.0.0-RESPONSE-PAYLOAD";

  constructor(
    resolvedValue: number,
    computedResult: string,
    responseId: string,
    correlationRequestId: string,
    responseStatusCode: number = 200,
  ) {
    super(resolvedValue, computedResult, responseId, correlationRequestId, responseStatusCode);
  }

  override getResolvedValue(): number {
    return this.resolvedValue;
  }

  override getComputedResult(): string {
    return this.computedResult;
  }

  override getResponseId(): string {
    return this.responseId;
  }

  override getCorrelationRequestId(): string {
    return this.correlationRequestId;
  }

  override getResponseTimestamp(): Date {
    return this.responseTimestamp;
  }

  override getComputationDurationMs(): number {
    return this.computationDurationMs;
  }

  override setComputationDurationMs(durationMs: number): void {
    this.computationDurationMs = durationMs;
  }

  override getResponseStatusCode(): number {
    return this.responseStatusCode;
  }

  override setResponseStatusCode(statusCode: number): void {
    this.responseStatusCode = statusCode;
  }

  override toResponsePayload(): Record<string, unknown> {
    return {
      resolvedValue: this.resolvedValue,
      computedResult: this.computedResult,
      responseId: this.responseId,
      correlationRequestId: this.correlationRequestId,
      responseTimestampISO: this.responseTimestamp.toISOString(),
      computationDurationMs: this.computationDurationMs,
      responseStatusCode: this.responseStatusCode,
      payloadVersion: FizzBuzzComputationResponseImpl.RESPONSE_PAYLOAD_VERSION,
    };
  }
}
