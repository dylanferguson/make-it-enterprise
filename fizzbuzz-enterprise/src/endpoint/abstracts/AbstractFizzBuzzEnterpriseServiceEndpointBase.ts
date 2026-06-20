import type {
  IFizzBuzzEnterpriseServiceEndpoint,
  IFizzBuzzEnterpriseServiceEndpointFaultInterceptor,
  FizzBuzzSingleValueComputationEndpointRequest,
  FizzBuzzSingleValueComputationEndpointResponse,
  FizzBuzzRangeComputationEndpointRequest,
  FizzBuzzRangeComputationEndpointResponse,
} from "../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";

export abstract class AbstractFizzBuzzEnterpriseServiceEndpointBase
  implements IFizzBuzzEnterpriseServiceEndpoint
{
  private readonly endpointName: string;
  private readonly endpointVersion: string;
  private readonly serviceDescriptor: string;
  private readonly wsdUrl: string;

  constructor(
    endpointName: string = "AbstractFizzBuzzEnterpriseServiceEndpoint",
    endpointVersion: string = "1.0.0-ABSTRACT-ENDPOINT-BASE",
    serviceDescriptor: string = "FizzBuzzEnterpriseService",
    wsdUrl: string = "http://enterprise.fizzbuzz/services/ComputationService",
  ) {
    this.endpointName = endpointName;
    this.endpointVersion = endpointVersion;
    this.serviceDescriptor = serviceDescriptor;
    this.wsdUrl = wsdUrl;
  }

  abstract invokeSingleValueComputation(
    request: FizzBuzzSingleValueComputationEndpointRequest,
  ): FizzBuzzSingleValueComputationEndpointResponse;

  abstract invokeRangeComputation(
    request: FizzBuzzRangeComputationEndpointRequest,
  ): FizzBuzzRangeComputationEndpointResponse;

  getEndpointName(): string {
    return this.endpointName;
  }

  getEndpointVersion(): string {
    return this.endpointVersion;
  }

  getEndpointServiceDescriptor(): string {
    return this.serviceDescriptor;
  }

  getEndpointWsdUrl(): string {
    return this.wsdUrl;
  }

  abstract isEndpointAvailable(): boolean;

  abstract getFaultInterceptorChain(): readonly IFizzBuzzEnterpriseServiceEndpointFaultInterceptor[];
}
