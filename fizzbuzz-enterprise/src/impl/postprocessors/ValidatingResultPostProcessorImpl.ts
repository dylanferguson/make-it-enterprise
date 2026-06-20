import type { IResultPostProcessor } from "../../contracts/IResultPostProcessor.js";
import type { IEnterpriseResultValidator } from "../../contracts/IEnterpriseResultValidator.js";

export class ValidatingResultPostProcessorImpl implements IResultPostProcessor {
  private static readonly POST_PROCESSOR_NAME = "ValidatingResultPostProcessor";
  private static readonly POST_PROCESSOR_PRIORITY = 100;
  private readonly validator: IEnterpriseResultValidator;

  constructor(validator: IEnterpriseResultValidator) {
    this.validator = validator;
  }

  postProcess(input: number, result: string): string {
    return this.validator.validate(input, result);
  }

  getPostProcessorName(): string {
    return ValidatingResultPostProcessorImpl.POST_PROCESSOR_NAME;
  }

  getPostProcessorPriority(): number {
    return ValidatingResultPostProcessorImpl.POST_PROCESSOR_PRIORITY;
  }
}
