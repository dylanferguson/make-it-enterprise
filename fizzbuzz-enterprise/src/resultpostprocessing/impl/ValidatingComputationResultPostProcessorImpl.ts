import { AbstractBaseEnterpriseComputationResultPostProcessor } from "../abstracts/AbstractBaseEnterpriseComputationResultPostProcessor.js";

export class ValidatingComputationResultPostProcessorImpl
  extends AbstractBaseEnterpriseComputationResultPostProcessor
{
  private static readonly PROCESSOR_NAME = "ValidatingComputationResultPostProcessor";
  private static readonly PROCESSOR_VERSION = "1.0.0-VALIDATING-POST-PROCESSOR";
  private static readonly PROCESSOR_PRIORITY = 100;
  private static readonly PROCESSOR_DESCRIPTOR = "RESULT_VALIDATION_THROUGH_CHAIN_POST_PROCESSOR";

  private validationCount: number = 0;
  private rejectionCount: number = 0;

  constructor() {
    super(
      ValidatingComputationResultPostProcessorImpl.PROCESSOR_NAME,
      ValidatingComputationResultPostProcessorImpl.PROCESSOR_VERSION,
      ValidatingComputationResultPostProcessorImpl.PROCESSOR_PRIORITY,
      ValidatingComputationResultPostProcessorImpl.PROCESSOR_DESCRIPTOR,
      true,
    );
  }

  override postProcessResult(value: number, computedResult: string, resolutionContext: string): string {
    this.validatePostProcessingInputs(value, computedResult);
    this.validationCount++;
    const trimmedResult = computedResult.trim();
    if (trimmedResult.length === 0) {
      this.rejectionCount++;
      return String(value);
    }
    return trimmedResult;
  }

  getValidationCount(): number {
    return this.validationCount;
  }

  getRejectionCount(): number {
    return this.rejectionCount;
  }
}
