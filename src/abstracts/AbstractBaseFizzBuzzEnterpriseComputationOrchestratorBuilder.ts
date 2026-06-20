import type { IFizzBuzzEnterpriseComputationOrchestratorBuilder } from "../contracts/IFizzBuzzEnterpriseComputationOrchestratorBuilder.js";
import type { IFizzBuzzEnterpriseComputationOrchestrator } from "../contracts/IFizzBuzzEnterpriseComputationOrchestrator.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";

export abstract class AbstractBaseFizzBuzzEnterpriseComputationOrchestratorBuilder
  implements IFizzBuzzEnterpriseComputationOrchestratorBuilder
{
  protected orchestratorName: string = "DefaultOrchestrator";
  protected orchestratorVersion: string = "1.0.0-ORCHESTRATOR";
  protected orchestrationEnabled: boolean = true;
  protected visitorDispatcher: IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher | null = null;
  protected defaultCommand: IFizzBuzzComputationCommand | null = null;
  protected readonly builderName: string;
  protected readonly builderVersion: string;

  constructor(builderName: string, builderVersion: string) {
    this.builderName = builderName;
    this.builderVersion = builderVersion;
  }

  abstract reset(): IFizzBuzzEnterpriseComputationOrchestratorBuilder;
  abstract build(): IFizzBuzzEnterpriseComputationOrchestrator;

  withOrchestratorName(name: string): IFizzBuzzEnterpriseComputationOrchestratorBuilder {
    this.orchestratorName = name;
    return this;
  }

  withOrchestratorVersion(version: string): IFizzBuzzEnterpriseComputationOrchestratorBuilder {
    this.orchestratorVersion = version;
    return this;
  }

  withOrchestrationEnabled(enabled: boolean): IFizzBuzzEnterpriseComputationOrchestratorBuilder {
    this.orchestrationEnabled = enabled;
    return this;
  }

  withVisitorDispatcher(
    dispatcher: IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher,
  ): IFizzBuzzEnterpriseComputationOrchestratorBuilder {
    this.visitorDispatcher = dispatcher;
    return this;
  }

  withDefaultCommand(command: IFizzBuzzComputationCommand): IFizzBuzzEnterpriseComputationOrchestratorBuilder {
    this.defaultCommand = command;
    return this;
  }

  getBuilderName(): string {
    return this.builderName;
  }

  getBuilderVersion(): string {
    return this.builderVersion;
  }
}
