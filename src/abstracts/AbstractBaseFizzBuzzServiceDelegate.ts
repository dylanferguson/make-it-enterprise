import type { IFizzBuzzServiceDelegate } from "../contracts/IFizzBuzzServiceDelegate.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";

export abstract class AbstractBaseFizzBuzzServiceDelegate implements IFizzBuzzServiceDelegate {
  protected static readonly DEFAULT_IMPLEMENTATION_VENDOR = "FizzBuzzEnterpriseSolutionsCorporation";

  abstract getDelegateName(): string;
  abstract getDelegateVersion(): string;
  abstract getDelegateImplementationVendor(): string;
  abstract delegateSingleValueResolution(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse;
  abstract delegateRangeComputation(startRequest: IFizzBuzzComputationRequest, endRequest: IFizzBuzzComputationRequest): readonly IFizzBuzzComputationResponse[];

  protected validateDelegateRequest(request: IFizzBuzzComputationRequest): void {
    if (request.getRequestedValue() < 0) {
      throw new Error(`[${this.getDelegateName()}] Negative value in delegate request: ${request.getRequestedValue()}`);
    }
  }

  protected generateCorrelationId(request: IFizzBuzzComputationRequest): string {
    return `corr:${request.getRequestId()}:${Date.now()}`;
  }

  protected getDelegateFrameworkVersion(): string {
    return "1.0.0-ENTERPRISE";
  }
}
