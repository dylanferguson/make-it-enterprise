import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IEnterpriseServiceBusMessage {
  getMessageId(): string;
  getMessageType(): string;
  getRequest(): IFizzBuzzComputationRequest;
  getResponse(): IFizzBuzzComputationResponse | null;
  getCorrelationId(): string;
  getTimestamp(): number;
  getOriginChannel(): string;
  getHeaders(): ReadonlyMap<string, string>;
  withResponse(response: IFizzBuzzComputationResponse): IEnterpriseServiceBusMessage;
}
