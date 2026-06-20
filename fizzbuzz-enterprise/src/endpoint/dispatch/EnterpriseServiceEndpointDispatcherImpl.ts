import type {
  IFizzBuzzEnterpriseServiceEndpointDispatcher,
} from "../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";
import {
  IFizzBuzzEnterpriseServiceEndpoint,
  FizzBuzzSingleValueComputationEndpointRequest,
  FizzBuzzSingleValueComputationEndpointResponse,
  FizzBuzzRangeComputationEndpointRequest,
  FizzBuzzRangeComputationEndpointResponse,
} from "../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";

function generateResponseId(): string {
  return `RES-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export class EnterpriseServiceEndpointDispatcherImpl
  implements IFizzBuzzEnterpriseServiceEndpointDispatcher
{
  private static readonly DISPATCHER_NAME = "EnterpriseServiceEndpointDispatcherImpl";
  private static readonly DISPATCHER_VERSION = "1.0.0-DISPATCHER-IMPL";
  private static readonly DISPATCH_PROTOCOL = "SOAP/HTTP-ENTERPRISE-SYNC";

  dispatchSingleValueResolution(
    endpoint: IFizzBuzzEnterpriseServiceEndpoint,
    request: FizzBuzzSingleValueComputationEndpointRequest,
  ): FizzBuzzSingleValueComputationEndpointResponse {
    const startTime = performance.now();
    try {
      const response = endpoint.invokeSingleValueComputation(request);
      return {
        ...response,
        computationDurationMs: Math.round(performance.now() - startTime),
      };
    } catch (fault) {
      const interceptorChain = endpoint.getFaultInterceptorChain();
      for (const interceptor of interceptorChain) {
        try {
          const intercepted = interceptor.interceptEndpointFault(
            fault instanceof Error ? fault : new Error(String(fault)),
            request,
          ) as FizzBuzzSingleValueComputationEndpointResponse;
          if (intercepted !== null && intercepted !== undefined) {
            return intercepted;
          }
        } catch {
          continue;
        }
      }
      throw fault;
    }
  }

  dispatchRangeResolution(
    endpoint: IFizzBuzzEnterpriseServiceEndpoint,
    request: FizzBuzzRangeComputationEndpointRequest,
  ): FizzBuzzRangeComputationEndpointResponse {
    const startTime = performance.now();
    try {
      const response = endpoint.invokeRangeComputation(request);
      return {
        ...response,
        computationDurationMs: Math.round(performance.now() - startTime),
      };
    } catch (fault) {
      const interceptorChain = endpoint.getFaultInterceptorChain();
      for (const interceptor of interceptorChain) {
        try {
          const intercepted = interceptor.interceptEndpointFault(
            fault instanceof Error ? fault : new Error(String(fault)),
            request,
          ) as FizzBuzzRangeComputationEndpointResponse;
          if (intercepted !== null && intercepted !== undefined) {
            return intercepted;
          }
        } catch {
          continue;
        }
      }
      throw fault;
    }
  }

  getDispatcherName(): string {
    return EnterpriseServiceEndpointDispatcherImpl.DISPATCHER_NAME;
  }

  getDispatcherVersion(): string {
    return EnterpriseServiceEndpointDispatcherImpl.DISPATCHER_VERSION;
  }

  getDispatchProtocol(): string {
    return EnterpriseServiceEndpointDispatcherImpl.DISPATCH_PROTOCOL;
  }
}
