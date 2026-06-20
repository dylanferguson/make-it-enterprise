export interface IFizzBuzzEnterpriseServiceEndpoint {
  invokeSingleValueComputation(request: FizzBuzzSingleValueComputationEndpointRequest): FizzBuzzSingleValueComputationEndpointResponse;
  invokeRangeComputation(request: FizzBuzzRangeComputationEndpointRequest): FizzBuzzRangeComputationEndpointResponse;
  getEndpointName(): string;
  getEndpointVersion(): string;
  getEndpointServiceDescriptor(): string;
  getEndpointWsdUrl(): string;
  isEndpointAvailable(): boolean;
  getFaultInterceptorChain(): readonly IFizzBuzzEnterpriseServiceEndpointFaultInterceptor[];
}

export interface FizzBuzzSingleValueComputationEndpointRequest {
  readonly value: number;
  readonly requestId: string;
  readonly requestOrigin: string;
  readonly requestTimestamp: Date;
  readonly messageFormat: string;
  readonly soapAction: string;
  readonly endpointVersion: string;
}

export interface FizzBuzzSingleValueComputationEndpointResponse {
  readonly resolvedValue: number;
  readonly computedResult: string;
  readonly responseId: string;
  readonly correlationRequestId: string;
  readonly responseTimestamp: Date;
  readonly computationDurationMs: number;
  readonly responseStatusCode: number;
  readonly responseStatusDescription: string;
  readonly endpointVersion: string;
}

export interface FizzBuzzRangeComputationEndpointRequest {
  readonly rangeStart: number;
  readonly rangeEnd: number;
  readonly requestId: string;
  readonly requestOrigin: string;
  readonly requestTimestamp: Date;
  readonly messageFormat: string;
  readonly soapAction: string;
  readonly endpointVersion: string;
}

export interface FizzBuzzRangeComputationEndpointResponse {
  readonly computedResults: readonly string[];
  readonly responseId: string;
  readonly correlationRequestId: string;
  readonly responseTimestamp: Date;
  readonly computationDurationMs: number;
  readonly resultCount: number;
  readonly responseStatusCode: number;
  readonly responseStatusDescription: string;
  readonly endpointVersion: string;
}

export interface IFizzBuzzEnterpriseServiceEndpointFaultInterceptor {
  interceptEndpointFault(
    fault: Error,
    request: FizzBuzzSingleValueComputationEndpointRequest | FizzBuzzRangeComputationEndpointRequest,
  ): FizzBuzzSingleValueComputationEndpointResponse | FizzBuzzRangeComputationEndpointResponse;
  getInterceptorName(): string;
  getInterceptorVersion(): string;
  getInterceptorOrder(): number;
}

export interface IFizzBuzzEnterpriseServiceEndpointDispatcher {
  dispatchSingleValueResolution(
    endpoint: IFizzBuzzEnterpriseServiceEndpoint,
    request: FizzBuzzSingleValueComputationEndpointRequest,
  ): FizzBuzzSingleValueComputationEndpointResponse;
  dispatchRangeResolution(
    endpoint: IFizzBuzzEnterpriseServiceEndpoint,
    request: FizzBuzzRangeComputationEndpointRequest,
  ): FizzBuzzRangeComputationEndpointResponse;
  getDispatcherName(): string;
  getDispatcherVersion(): string;
  getDispatchProtocol(): string;
}
