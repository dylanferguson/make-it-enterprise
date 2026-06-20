import { AbstractBaseEnterpriseComputationResultPostProcessor } from "../abstracts/AbstractBaseEnterpriseComputationResultPostProcessor.js";
import type { IEnterpriseComputationResultPostProcessor } from "../contracts/IEnterpriseComputationResultPostProcessor.js";

export class ChainOfResponsibilityComputationResultPostProcessorImpl
  extends AbstractBaseEnterpriseComputationResultPostProcessor
{
  private static readonly PROCESSOR_NAME = "ChainOfResponsibilityComputationResultPostProcessor";
  private static readonly PROCESSOR_VERSION = "1.0.0-CHAIN-OF-RESPONSIBILITY-POST-PROCESSOR";
  private static readonly PROCESSOR_PRIORITY = 50;
  private static readonly PROCESSOR_DESCRIPTOR = "COMPOSITE_CHAIN_OF_RESPONSIBILITY_POST_PROCESSOR_ORCHESTRATOR";

  private readonly registeredProcessors: IEnterpriseComputationResultPostProcessor[] = [];
  private processingCount: number = 0;

  constructor() {
    super(
      ChainOfResponsibilityComputationResultPostProcessorImpl.PROCESSOR_NAME,
      ChainOfResponsibilityComputationResultPostProcessorImpl.PROCESSOR_VERSION,
      ChainOfResponsibilityComputationResultPostProcessorImpl.PROCESSOR_PRIORITY,
      ChainOfResponsibilityComputationResultPostProcessorImpl.PROCESSOR_DESCRIPTOR,
      true,
    );
  }

  registerProcessorAtPosition(processor: IEnterpriseComputationResultPostProcessor, position: number): void {
    if (position < 0 || position > this.registeredProcessors.length) {
      this.registeredProcessors.push(processor);
    } else {
      this.registeredProcessors.splice(position, 0, processor);
    }
  }

  override postProcessResult(value: number, computedResult: string, resolutionContext: string): string {
    this.validatePostProcessingInputs(value, computedResult);
    this.processingCount++;
    let currentResult = computedResult;
    for (const processor of this.registeredProcessors) {
      if (processor.isProcessorActive()) {
        const processorStartTime = performance.now();
        currentResult = processor.postProcessResult(value, currentResult, resolutionContext);
        console.debug(
          `[${ChainOfResponsibilityComputationResultPostProcessorImpl.PROCESSOR_NAME} v${ChainOfResponsibilityComputationResultPostProcessorImpl.PROCESSOR_VERSION}] ` +
          `Chain processor [${processor.getProcessorName()} v${processor.getProcessorVersion()}] ` +
          `applied to value=[${value}]: result=[${currentResult}], ` +
          `duration=[${Math.round(performance.now() - processorStartTime)}ms], ` +
          `context=[${resolutionContext}]`,
        );
      }
    }
    return currentResult;
  }

  getRegisteredProcessorCount(): number {
    return this.registeredProcessors.length;
  }

  getRegisteredProcessorNames(): readonly string[] {
    return this.registeredProcessors.map((p) => p.getProcessorName());
  }

  getProcessingCount(): number {
    return this.processingCount;
  }
}
