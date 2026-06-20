import { AbstractBaseBatchJobExecutionMonitor } from "../abstracts/AbstractBaseBatchJobExecutionMonitor.js";

export class DefaultBatchJobExecutionMonitorImpl extends AbstractBaseBatchJobExecutionMonitor {
  private static readonly MONITOR_NAME = "DefaultBatchJobExecutionMonitor";
  private static readonly MONITOR_VERSION = "1.0.0-BATCH-EXECUTION-MONITOR";

  private chunksStarted: number = 0;
  private chunksCompleted: number = 0;
  private chunksFailed: number = 0;
  private totalItemsProcessed: number = 0;
  private accumulatedProcessingTimeMs: number = 0;
  private chunkTimestamps: Map<number, number> = new Map();

  constructor() {
    super(
      DefaultBatchJobExecutionMonitorImpl.MONITOR_NAME,
      DefaultBatchJobExecutionMonitorImpl.MONITOR_VERSION,
    );
  }

  override recordChunkStarted(chunkIndex: number): void {
    this.chunksStarted++;
    this.chunkTimestamps.set(chunkIndex, performance.now());
  }

  override recordChunkCompleted(chunkIndex: number, itemsProcessed: number): void {
    this.chunksCompleted++;
    this.totalItemsProcessed += itemsProcessed;
    const startTime = this.chunkTimestamps.get(chunkIndex);
    if (startTime !== undefined) {
      this.accumulatedProcessingTimeMs += performance.now() - startTime;
    }
  }

  override recordChunkFailed(chunkIndex: number, _errorDescription: string): void {
    this.chunksFailed++;
  }

  override getTotalChunksStarted(): number {
    return this.chunksStarted;
  }

  override getTotalChunksCompleted(): number {
    return this.chunksCompleted;
  }

  override getTotalChunksFailed(): number {
    return this.chunksFailed;
  }

  override getTotalItemsProcessed(): number {
    return this.totalItemsProcessed;
  }

  override getAverageProcessingTimeMs(): number {
    if (this.chunksCompleted === 0) return 0;
    return this.accumulatedProcessingTimeMs / this.chunksCompleted;
  }

  override getExecutionSummary(): Record<string, string> {
    return {
      monitorName: DefaultBatchJobExecutionMonitorImpl.MONITOR_NAME,
      monitorVersion: DefaultBatchJobExecutionMonitorImpl.MONITOR_VERSION,
      chunksStarted: String(this.chunksStarted),
      chunksCompleted: String(this.chunksCompleted),
      chunksFailed: String(this.chunksFailed),
      totalItemsProcessed: String(this.totalItemsProcessed),
      averageProcessingTimeMs: this.getAverageProcessingTimeMs().toFixed(2),
    };
  }
}
