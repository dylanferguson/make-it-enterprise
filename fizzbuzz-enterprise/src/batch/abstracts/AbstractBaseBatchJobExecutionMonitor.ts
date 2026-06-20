import type { IBatchJobExecutionMonitor } from "../contracts/index.js";

export abstract class AbstractBaseBatchJobExecutionMonitor
  implements IBatchJobExecutionMonitor
{
  private readonly monitorName: string;
  private readonly monitorVersion: string;

  constructor(monitorName: string, monitorVersion: string) {
    this.monitorName = monitorName;
    this.monitorVersion = monitorVersion;
  }

  abstract recordChunkStarted(chunkIndex: number): void;
  abstract recordChunkCompleted(chunkIndex: number, itemsProcessed: number): void;
  abstract recordChunkFailed(chunkIndex: number, errorDescription: string): void;
  abstract getTotalChunksStarted(): number;
  abstract getTotalChunksCompleted(): number;
  abstract getTotalChunksFailed(): number;
  abstract getTotalItemsProcessed(): number;
  abstract getAverageProcessingTimeMs(): number;
  abstract getExecutionSummary(): Record<string, string>;

  getMonitorName(): string {
    return this.monitorName;
  }

  getMonitorVersion(): string {
    return this.monitorVersion;
  }
}
