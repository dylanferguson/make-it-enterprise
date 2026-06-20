import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";
import type { IEnterpriseFizzBuzzCompositeStrategyTree } from "./IEnterpriseFizzBuzzCompositeStrategyTree.js";

export interface ICompositeStrategyResolutionDelegate {
  resolveWithCompositeTree(
    value: number,
    compositeTree: IEnterpriseFizzBuzzCompositeStrategyTree,
  ): string | null;
  getDelegateName(): string;
  getDelegateVersion(): string;
  isCompositeResolutionEnabled(): boolean;
  setCompositeResolutionEnabled(enabled: boolean): void;
}
