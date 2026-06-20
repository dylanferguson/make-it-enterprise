import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";

export abstract class AbstractBaseFizzBuzzComputationRequest implements IFizzBuzzComputationRequest {
  protected readonly requestedValue: number;
  protected readonly requestId: string;
  protected readonly requestOrigin: string;
  protected readonly requestTimestamp: Date;
  protected computationContext: string;
  protected static readonly DEFAULT_COMPUTATION_CONTEXT = "STANDARD_COMPUTATION_CONTEXT";

  constructor(requestedValue: number, requestId: string, requestOrigin: string) {
    this.requestedValue = requestedValue;
    this.requestId = requestId;
    this.requestOrigin = requestOrigin;
    this.requestTimestamp = new Date();
    this.computationContext = AbstractBaseFizzBuzzComputationRequest.DEFAULT_COMPUTATION_CONTEXT;
  }

  abstract getRequestedValue(): number;
  abstract getRequestId(): string;
  abstract getRequestOrigin(): string;
  abstract getRequestTimestamp(): Date;
  abstract getComputationContext(): string;
  abstract setComputationContext(context: string): void;
  abstract toRequestPayload(): Record<string, unknown>;

  protected validateRequestedValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(`[FizzBuzzComputationRequest] Invalid requested value: ${value}`);
    }
  }
}
