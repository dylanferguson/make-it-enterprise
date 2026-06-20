import type { IEnterpriseFizzBuzzResolutionDelegationOrchestrator } from "../../resolutiondelegation/contracts/IEnterpriseFizzBuzzResolutionDelegationOrchestrator.js";
import type { IFizzBuzzEnterpriseBusinessDelegate } from "../../contracts/IFizzBuzzEnterpriseBusinessDelegate.js";
import { AbstractBaseFizzBuzzPipelineExecutionCommand } from "../abstracts/AbstractBaseFizzBuzzPipelineExecutionCommand.js";

export class DelegationOrchestratorPipelineExecutionCommandImpl
  extends AbstractBaseFizzBuzzPipelineExecutionCommand
{
  private static readonly COMMAND_DESCRIPTOR = "DelegationOrchestratorPipelineExecutionCommand";
  private static readonly COMMAND_GROUP = "FIZZBUZZ_DELEGATION_ORCHESTRATOR_PIPELINE_COMMAND";

  private readonly delegationOrchestrator: IEnterpriseFizzBuzzResolutionDelegationOrchestrator;
  private readonly businessDelegate: IFizzBuzzEnterpriseBusinessDelegate;

  constructor(
    delegationOrchestrator: IEnterpriseFizzBuzzResolutionDelegationOrchestrator,
    businessDelegate: IFizzBuzzEnterpriseBusinessDelegate,
  ) {
    super();
    this.delegationOrchestrator = delegationOrchestrator;
    this.businessDelegate = businessDelegate;
  }

  override executeSingleValue(value: number): string {
    return this.delegationOrchestrator.orchestrateDelegation(value, (v: number) => {
      return this.businessDelegate.delegateSingleValueResolution(v);
    });
  }

  override executeRange(start: number, end: number): readonly string[] {
    return this.delegationOrchestrator.orchestrateRangeDelegation(start, end, (s: number, e: number) => {
      return this.businessDelegate.delegateRangeResolution(s, e);
    });
  }

  override getCommandDescriptor(): string {
    return DelegationOrchestratorPipelineExecutionCommandImpl.COMMAND_DESCRIPTOR;
  }

  override getCommandGroup(): string {
    return DelegationOrchestratorPipelineExecutionCommandImpl.COMMAND_GROUP;
  }
}
