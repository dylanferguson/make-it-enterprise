import { AbstractFizzBuzzEnterpriseServiceEndpointBase } from "../abstracts/AbstractFizzBuzzEnterpriseServiceEndpointBase.js";
import type {
  IFizzBuzzEnterpriseServiceEndpointFaultInterceptor,
  FizzBuzzSingleValueComputationEndpointRequest,
  FizzBuzzSingleValueComputationEndpointResponse,
  FizzBuzzRangeComputationEndpointRequest,
  FizzBuzzRangeComputationEndpointResponse,
} from "../contracts/IFizzBuzzEnterpriseServiceEndpoint.js";
import type { IFizzBuzzPipelineManager } from "../../pipeline/contracts/IFizzBuzzPipelineManager.js";
import type { IPipelineManagerResolutionStrategySelector } from "../../pipelineresolution/contracts/IPipelineManagerResolutionStrategySelector.js";

function generateEndpointResponseId(): string {
  return `EP-${Date.now()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
}

export class FizzBuzzEnterpriseServiceEndpointImpl
  extends AbstractFizzBuzzEnterpriseServiceEndpointBase
{
  private static readonly ENDPOINT_IMPL_NAME = "FizzBuzzEnterpriseServiceEndpointImpl";
  private static readonly ENDPOINT_IMPL_VERSION = "1.0.0-ENDPOINT-IMPL";

  private readonly faultInterceptors: readonly IFizzBuzzEnterpriseServiceEndpointFaultInterceptor[];
  private readonly pipelineManagerResolver: () => IFizzBuzzPipelineManager;
  private endpointAvailable: boolean;

  constructor(
    pipelineManagerResolver: () => IFizzBuzzPipelineManager,
    faultInterceptors: readonly IFizzBuzzEnterpriseServiceEndpointFaultInterceptor[] = [],
  ) {
    super(
      FizzBuzzEnterpriseServiceEndpointImpl.ENDPOINT_IMPL_NAME,
      FizzBuzzEnterpriseServiceEndpointImpl.ENDPOINT_IMPL_VERSION,
      "FizzBuzzEnterpriseService",
      "http://enterprise.fizzbuzz/services/ComputationService/wsdl/FizzBuzzEnterpriseServiceEndpoint.wsdl",
    );
    this.pipelineManagerResolver = pipelineManagerResolver;
    this.faultInterceptors = faultInterceptors;
    this.endpointAvailable = true;
  }

  override invokeSingleValueComputation(
    request: FizzBuzzSingleValueComputationEndpointRequest,
  ): FizzBuzzSingleValueComputationEndpointResponse {
    const startTime = performance.now();
    const manager = this.pipelineManagerResolver();
    const computedResult = manager.executeSingleValuePipeline(request.value);
    const computationDurationMs = Math.round(performance.now() - startTime);

    return {
      resolvedValue: request.value,
      computedResult,
      responseId: generateEndpointResponseId(),
      correlationRequestId: request.requestId,
      responseTimestamp: new Date(),
      computationDurationMs,
      responseStatusCode: 200,
      responseStatusDescription: "OK_COMPUTATION_SUCCESSFUL",
      endpointVersion: this.getEndpointVersion(),
    } satisfies FizzBuzzSingleValueComputationEndpointResponse;
  }

  override invokeRangeComputation(
    request: FizzBuzzRangeComputationEndpointRequest,
  ): FizzBuzzRangeComputationEndpointResponse {
    const startTime = performance.now();
    const manager = this.pipelineManagerResolver();
    const computedResults = manager.executeRangePipeline(request.rangeStart, request.rangeEnd);
    const computationDurationMs = Math.round(performance.now() - startTime);

    return {
      computedResults,
      responseId: generateEndpointResponseId(),
      correlationRequestId: request.requestId,
      responseTimestamp: new Date(),
      computationDurationMs,
      resultCount: computedResults.length,
      responseStatusCode: 200,
      responseStatusDescription: "OK_COMPUTATION_SUCCESSFUL",
      endpointVersion: this.getEndpointVersion(),
    } satisfies FizzBuzzRangeComputationEndpointResponse;
  }

  override isEndpointAvailable(): boolean {
    return this.endpointAvailable;
  }

  setEndpointAvailable(available: boolean): void {
    this.endpointAvailable = available;
  }

  override getFaultInterceptorChain(): readonly IFizzBuzzEnterpriseServiceEndpointFaultInterceptor[] {
    return this.faultInterceptors;
  }
}
