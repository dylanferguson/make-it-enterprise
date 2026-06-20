import type { IEnterpriseComputationResultPostProcessor } from "../contracts/IEnterpriseComputationResultPostProcessor.js";

export abstract class AbstractBaseEnterpriseComputationResultPostProcessor
  implements IEnterpriseComputationResultPostProcessor
{
  private readonly processorName: string;
  private readonly processorVersion: string;
  private readonly processorPriority: number;
  private readonly processorDescriptor: string;
  private processorActive: boolean;

  constructor(
    processorName: string,
    processorVersion: string,
    processorPriority: number,
    processorDescriptor: string,
    processorActive: boolean = true,
  ) {
    this.processorName = processorName;
    this.processorVersion = processorVersion;
    this.processorPriority = processorPriority;
    this.processorDescriptor = processorDescriptor;
    this.processorActive = processorActive;
  }

  getProcessorName(): string {
    return this.processorName;
  }

  getProcessorVersion(): string {
    return this.processorVersion;
  }

  getProcessorPriority(): number {
    return this.processorPriority;
  }

  getProcessorDescriptor(): string {
    return this.processorDescriptor;
  }

  isProcessorActive(): boolean {
    return this.processorActive;
  }

  protected setProcessorActive(active: boolean): void {
    this.processorActive = active;
  }

  abstract postProcessResult(value: number, computedResult: string, resolutionContext: string): string;

  protected validatePostProcessingInputs(value: number, computedResult: string): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.processorName} v${this.processorVersion}] Invalid input value for post-processing: ${value}`,
      );
    }
    if (computedResult === null || computedResult === undefined) {
      throw new Error(
        `[${this.processorName} v${this.processorVersion}] Computed result is null or undefined for value: ${value}`,
      );
    }
  }
}
