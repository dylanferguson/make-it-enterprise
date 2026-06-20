import type { IPipelineStage } from "../../contracts/IPipelineStage.js";
import type { IPipelineContext } from "../../contracts/IPipelineContext.js";
import type { IFizzBuzzComputationMediator } from "../../contracts/IFizzBuzzComputationMediator.js";
import { AbstractBasePipelineStage } from "../../abstracts/AbstractBasePipelineStage.js";

export class ValueResolutionDelegationPipelineStage extends AbstractBasePipelineStage<number, string> {
  private static readonly STAGE_NAME = "ValueResolutionDelegationPipelineStage";
  private static readonly STAGE_VERSION = "1.0.0-ENTERPRISE";
  private static readonly STAGE_PRIORITY = 75;

  private readonly mediator: IFizzBuzzComputationMediator;

  constructor(mediator: IFizzBuzzComputationMediator) {
    super();
    this.mediator = mediator;
  }

  override execute(input: number, context: IPipelineContext, nextStage: IPipelineStage<number, string> | null): string {
    this.preStageExecution(input);
    const stageStartTime = performance.now();
    const result = this.mediator.mediateValueResolution(input);
    context.setAttribute("valueResolution.result", result);
    context.setAttribute("valueResolution.input", input);
    this.postStageExecution(input, result, stageStartTime);
    return result;
  }

  override getStageName(): string {
    return ValueResolutionDelegationPipelineStage.STAGE_NAME;
  }

  override getStageVersion(): string {
    return ValueResolutionDelegationPipelineStage.STAGE_VERSION;
  }

  override getStagePriority(): number {
    return ValueResolutionDelegationPipelineStage.STAGE_PRIORITY;
  }

  override canHandle(input: number): boolean {
    return Number.isFinite(input) && input >= 0;
  }
}
