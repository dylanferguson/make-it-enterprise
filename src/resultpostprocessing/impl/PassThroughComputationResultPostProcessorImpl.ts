import { AbstractBaseEnterpriseComputationResultPostProcessor } from "../abstracts/AbstractBaseEnterpriseComputationResultPostProcessor.js";

export class PassThroughComputationResultPostProcessorImpl
  extends AbstractBaseEnterpriseComputationResultPostProcessor
{
  private static readonly PROCESSOR_NAME = "PassThroughComputationResultPostProcessor";
  private static readonly PROCESSOR_VERSION = "1.0.0-PASS-THROUGH-POST-PROCESSOR";
  private static readonly PROCESSOR_PRIORITY = 999;
  private static readonly PROCESSOR_DESCRIPTOR = "PASS_THROUGH_NULL_OBJECT_POST_PROCESSOR";

  private processingCount: number = 0;

  constructor() {
    super(
      PassThroughComputationResultPostProcessorImpl.PROCESSOR_NAME,
      PassThroughComputationResultPostProcessorImpl.PROCESSOR_VERSION,
      PassThroughComputationResultPostProcessorImpl.PROCESSOR_PRIORITY,
      PassThroughComputationResultPostProcessorImpl.PROCESSOR_DESCRIPTOR,
      true,
    );
  }

  override postProcessResult(value: number, computedResult: string, _resolutionContext: string): string {
    this.validatePostProcessingInputs(value, computedResult);
    this.processingCount++;
    return computedResult;
  }

  getProcessingCount(): number {
    return this.processingCount;
  }
}
