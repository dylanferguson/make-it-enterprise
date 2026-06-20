import { AbstractBaseFizzBuzzEnterpriseComputationOrchestratorBuilder } from "../../abstracts/AbstractBaseFizzBuzzEnterpriseComputationOrchestratorBuilder.js";
import type { IFizzBuzzEnterpriseComputationOrchestrator } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestrator.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorBuilder } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestratorBuilder.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import { FizzBuzzEnterpriseComputationOrchestratorImpl } from "./FizzBuzzEnterpriseComputationOrchestratorImpl.js";
import { FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl } from "./FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl.js";

export class FizzBuzzEnterpriseComputationOrchestratorBuilderImpl extends AbstractBaseFizzBuzzEnterpriseComputationOrchestratorBuilder {
  private static readonly BUILDER_NAME = "FizzBuzzEnterpriseComputationOrchestratorBuilderImpl";
  private static readonly BUILDER_VERSION = "2.0.0-ORCHESTRATOR-BUILDER";

  constructor() {
    super(
      FizzBuzzEnterpriseComputationOrchestratorBuilderImpl.BUILDER_NAME,
      FizzBuzzEnterpriseComputationOrchestratorBuilderImpl.BUILDER_VERSION,
    );
  }

  override reset(): IFizzBuzzEnterpriseComputationOrchestratorBuilder {
    this.orchestratorName = "DefaultOrchestrator";
    this.orchestratorVersion = "1.0.0-ORCHESTRATOR";
    this.orchestrationEnabled = true;
    this.visitorDispatcher = null;
    this.defaultCommand = null;
    return this;
  }

  override build(): IFizzBuzzEnterpriseComputationOrchestrator {
    const dispatcher: IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher =
      this.visistorDispatcher ?? new FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl();
    return new FizzBuzzEnterpriseComputationOrchestratorImpl(
      dispatcher,
      this.orchestratorName,
      this.orchestratorVersion,
      this.orchestrationEnabled,
    );
  }

  private get visistorDispatcher(): IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher | null {
    return this.visitorDispatcher;
  }
}
