import { AbstractBaseFizzBuzzComputationRequest } from "../../abstracts/AbstractBaseFizzBuzzComputationRequest.js";

export class FizzBuzzComputationRequestImpl extends AbstractBaseFizzBuzzComputationRequest {
  private static readonly DEFAULT_REQUEST_ORIGIN = "FizzBuzzComputationRequestFactoryBean";
  private static readonly REQUEST_PAYLOAD_VERSION = "1.0.0-REQUEST-PAYLOAD";

  constructor(requestedValue: number, requestId: string, requestOrigin: string = FizzBuzzComputationRequestImpl.DEFAULT_REQUEST_ORIGIN) {
    super(requestedValue, requestId, requestOrigin);
    this.validateRequestedValue(requestedValue);
  }

  override getRequestedValue(): number {
    return this.requestedValue;
  }

  override getRequestId(): string {
    return this.requestId;
  }

  override getRequestOrigin(): string {
    return this.requestOrigin;
  }

  override getRequestTimestamp(): Date {
    return this.requestTimestamp;
  }

  override getComputationContext(): string {
    return this.computationContext;
  }

  override setComputationContext(context: string): void {
    this.computationContext = context;
  }

  override toRequestPayload(): Record<string, unknown> {
    return {
      requestedValue: this.requestedValue,
      requestId: this.requestId,
      requestOrigin: this.requestOrigin,
      requestTimestampISO: this.requestTimestamp.toISOString(),
      computationContext: this.computationContext,
      payloadVersion: FizzBuzzComputationRequestImpl.REQUEST_PAYLOAD_VERSION,
    };
  }
}
