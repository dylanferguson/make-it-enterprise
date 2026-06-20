import type {
  FizzBuzzSingleValueComputationEndpointRequest,
  FizzBuzzSingleValueComputationEndpointResponse,
  FizzBuzzRangeComputationEndpointRequest,
  FizzBuzzRangeComputationEndpointResponse,
  IFizzBuzzEnterpriseServiceEndpointDispatcher,
  IFizzBuzzEnterpriseServiceEndpoint,
} from "../endpoint/contracts/IFizzBuzzEnterpriseServiceEndpoint.js";

function generateServiceActivatorRequestId(): string {
  return `SA-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export class FizzBuzzEndpointAwareServiceActivatorImpl {
  private static readonly ACTIVATOR_NAME = "FizzBuzzEndpointAwareServiceActivatorImpl";
  private static readonly ACTIVATOR_VERSION = "1.0.0-SERVICE-ACTIVATOR";
  private static readonly ENDPOINT_VERSION = "1.0.0-ENDPOINT-CONTRACT";

  private readonly dispatcher: IFizzBuzzEnterpriseServiceEndpointDispatcher;
  private readonly endpoint: IFizzBuzzEnterpriseServiceEndpoint;

  constructor(
    dispatcher: IFizzBuzzEnterpriseServiceEndpointDispatcher,
    endpoint: IFizzBuzzEnterpriseServiceEndpoint,
  ) {
    this.dispatcher = dispatcher;
    this.endpoint = endpoint;
  }

  activateSingleValueResolution(value: number): string {
    const request: FizzBuzzSingleValueComputationEndpointRequest = {
      value,
      requestId: generateServiceActivatorRequestId(),
      requestOrigin: "FizzBuzzEndpointAwareServiceActivatorImpl",
      requestTimestamp: new Date(),
      messageFormat: "SOAP-ENVELOPE-1.2",
      soapAction: "urn:enterprise:fizzbuzz:computation:resolveSingleValue",
      endpointVersion: FizzBuzzEndpointAwareServiceActivatorImpl.ENDPOINT_VERSION,
    };

    console.debug(
      `[${FizzBuzzEndpointAwareServiceActivatorImpl.ACTIVATOR_NAME} v${FizzBuzzEndpointAwareServiceActivatorImpl.ACTIVATOR_VERSION}] ` +
      `Activating single value resolution: value=[${value}], ` +
      `requestId=[${request.requestId}], ` +
      `endpoint=[${this.endpoint.getEndpointName()} v${this.endpoint.getEndpointVersion()}], ` +
      `dispatcher=[${this.dispatcher.getDispatcherName()}], ` +
      `dispatchProtocol=[${this.dispatcher.getDispatchProtocol()}]`,
    );

    const response: FizzBuzzSingleValueComputationEndpointResponse =
      this.dispatcher.dispatchSingleValueResolution(this.endpoint, request);

    return response.computedResult;
  }

  activateRangeResolution(start: number, end: number): readonly string[] {
    const request: FizzBuzzRangeComputationEndpointRequest = {
      rangeStart: start,
      rangeEnd: end,
      requestId: generateServiceActivatorRequestId(),
      requestOrigin: "FizzBuzzEndpointAwareServiceActivatorImpl",
      requestTimestamp: new Date(),
      messageFormat: "SOAP-ENVELOPE-1.2",
      soapAction: "urn:enterprise:fizzbuzz:computation:resolveRange",
      endpointVersion: FizzBuzzEndpointAwareServiceActivatorImpl.ENDPOINT_VERSION,
    };

    console.debug(
      `[${FizzBuzzEndpointAwareServiceActivatorImpl.ACTIVATOR_NAME} v${FizzBuzzEndpointAwareServiceActivatorImpl.ACTIVATOR_VERSION}] ` +
      `Activating range resolution: range=[${start}..${end}], ` +
      `requestId=[${request.requestId}], ` +
      `endpoint=[${this.endpoint.getEndpointName()} v${this.endpoint.getEndpointVersion()}], ` +
      `dispatcher=[${this.dispatcher.getDispatcherName()}], ` +
      `dispatchProtocol=[${this.dispatcher.getDispatchProtocol()}]`,
    );

    const response: FizzBuzzRangeComputationEndpointResponse =
      this.dispatcher.dispatchRangeResolution(this.endpoint, request);

    return response.computedResults;
  }

  getActivatorName(): string {
    return FizzBuzzEndpointAwareServiceActivatorImpl.ACTIVATOR_NAME;
  }

  getActivatorVersion(): string {
    return FizzBuzzEndpointAwareServiceActivatorImpl.ACTIVATOR_VERSION;
  }
}
