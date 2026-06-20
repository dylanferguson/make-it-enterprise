import type { IBatchChunkOrientedItemProcessor } from "../contracts/index.js";

export abstract class AbstractBaseBatchChunkOrientedItemProcessor<TInput, TOutput>
  implements IBatchChunkOrientedItemProcessor<TInput, TOutput>
{
  private readonly processorName: string;
  private readonly processorVersion: string;
  private successfullyProcessedCount: number = 0;
  private failedProcessingCount: number = 0;

  constructor(processorName: string, processorVersion: string) {
    this.processorName = processorName;
    this.processorVersion = processorVersion;
  }

  abstract processItem(item: TInput): TOutput;

  getProcessorName(): string {
    return this.processorName;
  }

  getProcessorVersion(): string {
    return this.processorVersion;
  }

  getSuccessfullyProcessedCount(): number {
    return this.successfullyProcessedCount;
  }

  getFailedProcessingCount(): number {
    return this.failedProcessingCount;
  }

  protected incrementSuccessCount(): void {
    this.successfullyProcessedCount++;
  }

  protected incrementFailedCount(): void {
    this.failedProcessingCount++;
  }
}
