export interface IFizzBuzzComputationRequest {
  getRequestedValue(): number;
  getRequestId(): string;
  getRequestOrigin(): string;
  getRequestTimestamp(): Date;
  getComputationContext(): string;
  setComputationContext(context: string): void;
  toRequestPayload(): Record<string, unknown>;
}
