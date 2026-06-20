import { AbstractBaseFizzBuzzServiceDelegate } from "../../abstracts/AbstractBaseFizzBuzzServiceDelegate.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzEnterpriseServiceFacade } from "../../contracts/IFizzBuzzEnterpriseServiceFacade.js";
import { FizzBuzzComputationResponseImpl } from "../dto/FizzBuzzComputationResponseImpl.js";
import { FizzBuzzComputationRequestImpl } from "../dto/FizzBuzzComputationRequestImpl.js";

export class FizzBuzzClientSideServiceDelegateImpl extends AbstractBaseFizzBuzzServiceDelegate {
  private static readonly DELEGATE_NAME = "FizzBuzzClientSideServiceDelegate";
  private static readonly DELEGATE_VERSION = "1.0.0-CLIENT-DELEGATE";

  private readonly enterpriseServiceFacade: IFizzBuzzEnterpriseServiceFacade;

  constructor(enterpriseServiceFacade: IFizzBuzzEnterpriseServiceFacade) {
    super();
    this.enterpriseServiceFacade = enterpriseServiceFacade;
  }

  override getDelegateName(): string {
    return FizzBuzzClientSideServiceDelegateImpl.DELEGATE_NAME;
  }

  override getDelegateVersion(): string {
    return FizzBuzzClientSideServiceDelegateImpl.DELEGATE_VERSION;
  }

  override getDelegateImplementationVendor(): string {
    return AbstractBaseFizzBuzzServiceDelegate.DEFAULT_IMPLEMENTATION_VENDOR;
  }

  override delegateSingleValueResolution(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    this.validateDelegateRequest(request);

    const startTime = performance.now();
    const result = this.enterpriseServiceFacade.resolveEnterpriseValue(request.getRequestedValue());
    const durationMs = performance.now() - startTime;
    const correlationId = this.generateCorrelationId(request);

    const response = new FizzBuzzComputationResponseImpl(
      request.getRequestedValue(),
      result,
      `resp:client:${correlationId}`,
      correlationId,
    );
    response.setComputationDurationMs(durationMs);
    return response;
  }

  override delegateRangeComputation(
    startRequest: IFizzBuzzComputationRequest,
    endRequest: IFizzBuzzComputationRequest,
  ): readonly IFizzBuzzComputationResponse[] {
    this.validateDelegateRequest(startRequest);
    this.validateDelegateRequest(endRequest);

    const start = startRequest.getRequestedValue();
    const end = endRequest.getRequestedValue();
    const results = this.enterpriseServiceFacade.calculateEnterpriseRange(start, end);
    const responses: IFizzBuzzComputationResponse[] = [];
    const baseCorrelationId = `corr:range:${start}:${end}:${Date.now()}`;

    for (let i = 0; i < results.length; i++) {
      const response = new FizzBuzzComputationResponseImpl(
        start + i,
        results[i]!,
        `resp:client:${baseCorrelationId}:${i}`,
        baseCorrelationId,
      );
      responses.push(response);
    }

    return responses;
  }
}
