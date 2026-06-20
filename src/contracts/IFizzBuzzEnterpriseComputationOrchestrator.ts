import type { IFizzBuzzComputationRequest } from "./IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "./IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";
import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";

export interface IFizzBuzzEnterpriseComputationOrchestrator {
  orchestrate(
    request: IFizzBuzzComputationRequest,
    command: IFizzBuzzComputationCommand,
  ): IFizzBuzzComputationResponse;
  getVisitorDispatcher(): IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher;
  getOrchestratorName(): string;
  getOrchestratorVersion(): string;
  isOrchestrationEnabled(): boolean;
}
