import type { IPipelineStage } from "../../contracts/IPipelineStage.js";
import type { IPipelineContext } from "../../contracts/IPipelineContext.js";
import type { IResultPostProcessorChain } from "../../contracts/IResultPostProcessorChain.js";
import { AbstractBasePipelineStage } from "../../abstracts/AbstractBasePipelineStage.js";

export class ResultPostProcessingPipelineStage extends AbstractBasePipelineStage<number, string> {
  private static readonly STAGE_NAME = "ResultPostProcessingPipelineStage";
  private static readonly STAGE_VERSION = "1.0.0-ENTERPRISE";
  private static readonly STAGE_PRIORITY = 25;

  private readonly postProcessorChain: IResultPostProcessorChain;

  constructor(postProcessorChain: IResultPostProcessorChain) {
    super();
    this.postProcessorChain = postProcessorChain;
  }

  override execute(input: number, context: IPipelineContext, nextStage: IPipelineStage<number, string> | null): string {
    this.preStageExecution(input);
    const stageStartTime = performance.now();
    const previousResult = context.getAttribute<string>("valueResolution.result") ?? this.handleNext(input, context, nextStage);
    const postProcessed = this.postProcessorChain.process(input, previousResult);
    context.setAttribute("postProcessed.result", postProcessed);
    context.setAttribute("postProcessed.originalResult", previousResult);
    this.postStageExecution(input, postProcessed, stageStartTime);
    return postProcessed;
  }

  override getStageName(): string {
    return ResultPostProcessingPipelineStage.STAGE_NAME;
  }

  override getStageVersion(): string {
    return ResultPostProcessingPipelineStage.STAGE_VERSION;
  }

  override getStagePriority(): number {
    return ResultPostProcessingPipelineStage.STAGE_PRIORITY;
  }

  override canHandle(input: number): boolean {
    return true;
  }
}
