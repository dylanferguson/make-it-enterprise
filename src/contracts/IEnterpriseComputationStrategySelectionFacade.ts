import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";

export interface IEnterpriseComputationStrategySelectionFacade extends IFizzBuzzSingleValueResolutionFacade {
  getSelectionFacadeName(): string;
  getSelectionFacadeVersion(): string;
}
