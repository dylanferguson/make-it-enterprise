import type { IFizzBuzzEnterpriseComputationOrchestrator } from "../contracts/IFizzBuzzEnterpriseComputationOrchestrator.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";

export abstract class AbstractBaseFizzBuzzEnterpriseComputationOrchestrator
  implements IFizzBuzzEnterpriseComputationOrchestrator
{
  protected readonly visitorDispatcher: IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher;
  protected readonly orchestratorName: string;
  protected readonly orchestratorVersion: string;
  protected orchestrationEnabled: boolean;

  constructor(
    visitorDispatcher: IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher,
    orchestratorName: string,
    orchestratorVersion: string,
    orchestrationEnabled: boolean = true,
  ) {
    this.visitorDispatcher = visitorDispatcher;
    this.orchestratorName = orchestratorName;
    this.orchestratorVersion = orchestratorVersion;
    this.orchestrationEnabled = orchestrationEnabled;
  }

  abstract orchestrate(
    request: IFizzBuzzComputationRequest,
    command: IFizzBuzzComputationCommand,
  ): IFizzBuzzComputationResponse;

  getVisitorDispatcher(): IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher {
    return this.visitorDispatcher;
  }

  getOrchestratorName(): string {
    return this.orchestratorName;
  }

  getOrchestratorVersion(): string {
    return this.orchestratorVersion;
  }

  isOrchestrationEnabled(): boolean {
    return this.orchestrationEnabled;
  }

  protected preOrchestrationHook(
    _request: IFizzBuzzComputationRequest,
    _command: IFizzBuzzComputationCommand,
  ): void {
    console.debug(
      `[${this.orchestratorName}] Pre-orchestration hook invoked for command [${_command.getCommandName()}]`,
    );
  }

  protected postOrchestrationHook(
    _request: IFizzBuzzComputationRequest,
    _command: IFizzBuzzComputationCommand,
    _response: IFizzBuzzComputationResponse,
  ): void {
    console.debug(
      `[${this.orchestratorName}] Post-orchestration hook invoked for command [${_command.getCommandName()}]`,
    );
  }

  protected handleOrchestrationError(
    request: IFizzBuzzComputationRequest,
    command: IFizzBuzzComputationCommand,
    error: Error,
  ): IFizzBuzzComputationResponse {
    console.error(
      `[${this.orchestratorName}] Orchestration error for command [${command.getCommandName()}]: ${error.message}`,
    );
    throw error;
  }
}
