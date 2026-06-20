import { AbstractBasePipelineContext } from "../../abstracts/AbstractBasePipelineContext.js";

export class FizzBuzzPipelineContextImpl extends AbstractBasePipelineContext {
  private static readonly CONTEXT_NAME = "FizzBuzzPipelineContext";
  private static readonly CONTEXT_VERSION = "1.0.0-ENTERPRISE";

  override getContextName(): string {
    return FizzBuzzPipelineContextImpl.CONTEXT_NAME;
  }

  override getContextVersion(): string {
    return FizzBuzzPipelineContextImpl.CONTEXT_VERSION;
  }
}
