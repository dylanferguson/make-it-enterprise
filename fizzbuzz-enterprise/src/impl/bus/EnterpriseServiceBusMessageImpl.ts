import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IEnterpriseServiceBusMessage } from "../../contracts/IEnterpriseServiceBusMessage.js";

export class EnterpriseServiceBusMessageImpl implements IEnterpriseServiceBusMessage {
  private readonly messageId: string;
  private readonly messageType: string;
  private readonly request: IFizzBuzzComputationRequest;
  private readonly response: IFizzBuzzComputationResponse | null;
  private readonly correlationId: string;
  private readonly timestamp: number;
  private readonly originChannel: string;
  private readonly headers: Map<string, string>;

  constructor(
    messageType: string,
    request: IFizzBuzzComputationRequest,
    response: IFizzBuzzComputationResponse | null = null,
    correlationId: string,
    originChannel: string = "unknown",
    headers: Map<string, string> = new Map(),
  ) {
    this.messageId = `esb:msg:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
    this.messageType = messageType;
    this.request = request;
    this.response = response;
    this.correlationId = correlationId;
    this.timestamp = Date.now();
    this.originChannel = originChannel;
    this.headers = headers;
  }

  getMessageId(): string {
    return this.messageId;
  }

  getMessageType(): string {
    return this.messageType;
  }

  getRequest(): IFizzBuzzComputationRequest {
    return this.request;
  }

  getResponse(): IFizzBuzzComputationResponse | null {
    return this.response;
  }

  getCorrelationId(): string {
    return this.correlationId;
  }

  getTimestamp(): number {
    return this.timestamp;
  }

  getOriginChannel(): string {
    return this.originChannel;
  }

  getHeaders(): ReadonlyMap<string, string> {
    return this.headers;
  }

  withResponse(response: IFizzBuzzComputationResponse): IEnterpriseServiceBusMessage {
    return new EnterpriseServiceBusMessageImpl(
      this.messageType,
      this.request,
      response,
      this.correlationId,
      this.originChannel,
      this.headers,
    );
  }
}
