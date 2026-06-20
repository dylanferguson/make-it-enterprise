import { AbstractBaseFizzBuzzEnterpriseComputationOrchestrator } from "../../abstracts/AbstractBaseFizzBuzzEnterpriseComputationOrchestrator.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzEnterpriseEvaluationContext } from "../../contracts/IFizzBuzzEnterpriseEvaluationContext.js";
import { FizzBuzzEnterpriseEvaluationContextImpl } from "../evaluation/FizzBuzzEnterpriseEvaluationContextImpl.js";

export class FizzBuzzEnterpriseComputationOrchestratorImpl extends AbstractBaseFizzBuzzEnterpriseComputationOrchestrator {
  private static readonly DEFAULT_ORCHESTRATOR_NAME = "FizzBuzzEnterpriseComputationOrchestrator";
  private static readonly DEFAULT_ORCHESTRATOR_VERSION = "2.0.0-ORCHESTRATOR-ENTERPRISE";
  private static readonly ORCHESTRATION_ORIGIN = "OrchestratorVisitorDispatcherMediator";
  private invocationCount: number = 0;

  constructor(
    visitorDispatcher: IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher,
    orchestratorName: string = FizzBuzzEnterpriseComputationOrchestratorImpl.DEFAULT_ORCHESTRATOR_NAME,
    orchestratorVersion: string = FizzBuzzEnterpriseComputationOrchestratorImpl.DEFAULT_ORCHESTRATOR_VERSION,
    orchestrationEnabled: boolean = true,
  ) {
    super(visitorDispatcher, orchestratorName, orchestratorVersion, orchestrationEnabled);
  }

  override orchestrate(
    request: IFizzBuzzComputationRequest,
    command: IFizzBuzzComputationCommand,
  ): IFizzBuzzComputationResponse {
    this.invocationCount++;
    this.preOrchestrationHook(request, command);

    const value = request.getRequestedValue();
    const context: IFizzBuzzEnterpriseEvaluationContext = this.createOrchestrationContext(value);

    if (this.orchestrationEnabled) {
      this.visitorDispatcher.dispatchVisitors(context);
    }

    let response: IFizzBuzzComputationResponse;
    try {
      response = command.execute(request);
    } catch (error) {
      return this.handleOrchestrationError(
        request,
        command,
        error instanceof Error ? error : new Error(String(error)),
      );
    }

    this.postOrchestrationHook(request, command, response);
    return response;
  }

  getInvocationCount(): number {
    return this.invocationCount;
  }

  private createOrchestrationContext(value: number): IFizzBuzzEnterpriseEvaluationContext {
    return new FizzBuzzEnterpriseEvaluationContextImpl(
      value,
      FizzBuzzEnterpriseComputationOrchestratorImpl.ORCHESTRATION_ORIGIN,
      FizzBuzzEnterpriseComputationOrchestratorImpl.DEFAULT_ORCHESTRATOR_VERSION,
    );
  }
}
