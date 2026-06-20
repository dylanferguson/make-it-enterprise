import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";
import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";

export interface IEnterpriseComputationStrategySelectionHandler {
  setNext(handler: IEnterpriseComputationStrategySelectionHandler): IEnterpriseComputationStrategySelectionHandler;
  handleStrategySelection(context: IEnterpriseComputationStrategySelectionContext): IFizzBuzzComputationCommand | null;
  getHandlerName(): string;
  getHandlerPriority(): number;
  canHandle(context: IEnterpriseComputationStrategySelectionContext): boolean;
}
