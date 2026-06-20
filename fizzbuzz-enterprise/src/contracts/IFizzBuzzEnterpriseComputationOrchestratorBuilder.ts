import type { IFizzBuzzEnterpriseComputationOrchestrator } from "./IFizzBuzzEnterpriseComputationOrchestrator.js";
import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "./IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";

export interface IFizzBuzzEnterpriseComputationOrchestratorBuilder {
  reset(): IFizzBuzzEnterpriseComputationOrchestratorBuilder;
  withOrchestratorName(name: string): IFizzBuzzEnterpriseComputationOrchestratorBuilder;
  withOrchestratorVersion(version: string): IFizzBuzzEnterpriseComputationOrchestratorBuilder;
  withOrchestrationEnabled(enabled: boolean): IFizzBuzzEnterpriseComputationOrchestratorBuilder;
  withVisitorDispatcher(
    dispatcher: IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher,
  ): IFizzBuzzEnterpriseComputationOrchestratorBuilder;
  withDefaultCommand(command: IFizzBuzzComputationCommand): IFizzBuzzEnterpriseComputationOrchestratorBuilder;
  build(): IFizzBuzzEnterpriseComputationOrchestrator;
  getBuilderName(): string;
  getBuilderVersion(): string;
}
