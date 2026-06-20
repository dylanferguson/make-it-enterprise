import { AbstractBasePipeline } from "../../abstracts/AbstractBasePipeline.js";
import type { IPipelineContext } from "../../contracts/IPipelineContext.js";
import { FizzBuzzPipelineContextImpl } from "./FizzBuzzPipelineContextImpl.js";

export class EnterpriseFizzBuzzPipelineImpl extends AbstractBasePipeline<number, string> {
  private static readonly PIPELINE_NAME = "EnterpriseFizzBuzzValueResolutionPipeline";
  private static readonly PIPELINE_VERSION = "1.0.0-ENTERPRISE";

  constructor(pipelineContext?: IPipelineContext) {
    super(pipelineContext ?? new FizzBuzzPipelineContextImpl());
  }

  override getPipelineName(): string {
    return EnterpriseFizzBuzzPipelineImpl.PIPELINE_NAME;
  }

  override getPipelineVersion(): string {
    return EnterpriseFizzBuzzPipelineImpl.PIPELINE_VERSION;
  }
}
