import { AbstractBaseFizzBuzzComputationCommandDecorator } from "../../abstracts/AbstractBaseFizzBuzzComputationCommandDecorator.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzEnterpriseComputationOrchestrator } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestrator.js";

export class OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl extends AbstractBaseFizzBuzzComputationCommandDecorator {
  private static readonly DECORATOR_NAME = "OrchestratorEnabledFizzBuzzComputationCommandDecorator";
  private static readonly DECORATOR_VERSION = "2.0.0-ORCHESTRATOR-DECORATOR";
  private static readonly DECORATOR_COMMAND_GROUP = "FIZZBUZZ_ORCHESTRATOR_DECORATED";

  private readonly orchestrator: IFizzBuzzEnterpriseComputationOrchestrator;
  private decorationCount: number = 0;

  constructor(
    wrappedCommand: IFizzBuzzComputationCommand,
    orchestrator: IFizzBuzzEnterpriseComputationOrchestrator,
  ) {
    super(wrappedCommand);
    this.orchestrator = orchestrator;
  }

  override execute(request: IFizzBuzzComputationRequest): IFizzBuzzComputationResponse {
    this.decorationCount++;
    return this.orchestrator.orchestrate(request, this.wrappedCommand);
  }

  override getCommandName(): string {
    return `${OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl.DECORATOR_NAME}:${this.wrappedCommand.getCommandName()}`;
  }

  override getCommandVersion(): string {
    return OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  override canExecute(input: number): boolean {
    return this.wrappedCommand.canExecute(input);
  }

  override getCommandGroup(): string {
    return OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl.DECORATOR_COMMAND_GROUP;
  }

  override getDecoratorName(): string {
    return OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl.DECORATOR_VERSION;
  }

  getOrchestrator(): IFizzBuzzEnterpriseComputationOrchestrator {
    return this.orchestrator;
  }

  getDecorationCount(): number {
    return this.decorationCount;
  }
}
