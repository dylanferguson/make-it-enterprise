export interface IFizzBuzzComputationResponse {
  getResolvedValue(): number;
  getComputedResult(): string;
  getResponseId(): string;
  getCorrelationRequestId(): string;
  getResponseTimestamp(): Date;
  getComputationDurationMs(): number;
  setComputationDurationMs(durationMs: number): void;
  getResponseStatusCode(): number;
  setResponseStatusCode(statusCode: number): void;
  toResponsePayload(): Record<string, unknown>;
}
