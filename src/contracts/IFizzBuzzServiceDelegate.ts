import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";

export interface IFizzBuzzServiceDelegate {
  delegateSingleValueResolution(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse;
  delegateRangeComputation(startRequest: IFizzBuzzComputationRequest, endRequest: IFizzBuzzComputationRequest): readonly IFizzBuzzComputationResponse[];
  getDelegateName(): string;
  getDelegateVersion(): string;
  getDelegateImplementationVendor(): string;
}
