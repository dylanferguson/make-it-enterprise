import type {
  IFizzBuzzEnterpriseServiceEndpointFaultInterceptor,
  FizzBuzzSingleValueComputationEndpointRequest,
  FizzBuzzSingleValueComputationEndpointResponse,
  FizzBuzzRangeComputationEndpointRequest,
  FizzBuzzRangeComputationEndpointResponse,
} from "../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";

export class EnterpriseServiceEndpointFaultInterceptorImpl
  implements IFizzBuzzEnterpriseServiceEndpointFaultInterceptor
{
  private readonly interceptorName: string;
  private readonly interceptorVersion: string;
  private readonly interceptorOrder: number;
  private readonly fallbackStatusCode: number;
  private readonly fallbackStatusDescription: string;

  constructor(
    name: string = "EnterpriseServiceEndpointFaultInterceptorImpl",
    version: string = "1.0.0-FAULT-INTERCEPTOR-DEFAULT",
    order: number = 0,
    fallbackStatusCode: number = 500,
    fallbackStatusDescription: string = "INTERNAL_SERVER_ERROR_ENDPOINT_FAULT",
  ) {
    this.interceptorName = name;
    this.interceptorVersion = version;
    this.interceptorOrder = order;
    this.fallbackStatusCode = fallbackStatusCode;
    this.fallbackStatusDescription = fallbackStatusDescription;
  }

  interceptEndpointFault(
    fault: Error,
    request: FizzBuzzSingleValueComputationEndpointRequest | FizzBuzzRangeComputationEndpointRequest,
  ): FizzBuzzSingleValueComputationEndpointResponse | FizzBuzzRangeComputationEndpointResponse {
    const responseId = `FLT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const errorMessage = fault.message || "Unknown endpoint fault";
    console.debug(
      `[${this.interceptorName} v${this.interceptorVersion}] Fault intercepted: ${fault.name}: ${errorMessage}`,
    );

    if ("value" in request) {
      return {
        resolvedValue: request.value,
        computedResult: `ERROR: ${errorMessage}`,
        responseId,
        correlationRequestId: request.requestId,
        responseTimestamp: new Date(),
        computationDurationMs: 0,
        responseStatusCode: this.fallbackStatusCode,
        responseStatusDescription: `${this.fallbackStatusDescription}: ${errorMessage}`,
        endpointVersion: request.endpointVersion,
      } satisfies FizzBuzzSingleValueComputationEndpointResponse;
    }
    return {
      computedResults: [],
      responseId,
      correlationRequestId: request.requestId,
      responseTimestamp: new Date(),
      computationDurationMs: 0,
      resultCount: 0,
      responseStatusCode: this.fallbackStatusCode,
      responseStatusDescription: `${this.fallbackStatusDescription}: ${errorMessage}`,
      endpointVersion: request.endpointVersion,
    } satisfies FizzBuzzRangeComputationEndpointResponse;
  }

  getInterceptorName(): string {
    return this.interceptorName;
  }

  getInterceptorVersion(): string {
    return this.interceptorVersion;
  }

  getInterceptorOrder(): number {
    return this.interceptorOrder;
  }
}
