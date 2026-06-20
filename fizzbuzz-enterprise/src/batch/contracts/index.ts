export interface IBatchChunkOrientedItemReader<T> {
  getReaderName(): string;
  getReaderVersion(): string;
  open(): void;
  readChunk(chunkSize: number): readonly T[];
  hasMore(): boolean;
  close(): void;
  getTotalReadCount(): number;
}

export interface IBatchChunkOrientedItemProcessor<TInput, TOutput> {
  getProcessorName(): string;
  getProcessorVersion(): string;
  processItem(item: TInput): TOutput;
  getSuccessfullyProcessedCount(): number;
  getFailedProcessingCount(): number;
}

export interface IBatchChunkOrientedItemWriter<T> {
  getWriterName(): string;
  getWriterVersion(): string;
  open(): void;
  writeChunk(items: readonly T[]): void;
  close(): void;
  getTotalWrittenCount(): number;
}

export interface IBatchJobConfiguration {
  getConfigurationName(): string;
  getConfigurationVersion(): string;
  getChunkSize(): number;
  getSkipLimit(): number;
  isRetryEnabled(): boolean;
  getMaxRetryAttempts(): number;
  getJobInstanceName(): string;
}

export interface IBatchJobExecutionMonitor {
  getMonitorName(): string;
  getMonitorVersion(): string;
  recordChunkStarted(chunkIndex: number): void;
  recordChunkCompleted(chunkIndex: number, itemsProcessed: number): void;
  recordChunkFailed(chunkIndex: number, errorDescription: string): void;
  getTotalChunksStarted(): number;
  getTotalChunksCompleted(): number;
  getTotalChunksFailed(): number;
  getTotalItemsProcessed(): number;
  getAverageProcessingTimeMs(): number;
  getExecutionSummary(): Record<string, string>;
}

export interface IBatchChunkOrientedJob<TInput, TOutput> {
  getJobName(): string;
  getJobVersion(): string;
  execute(): readonly TOutput[];
  getConfiguration(): IBatchJobConfiguration;
  getExecutionMonitor(): IBatchJobExecutionMonitor;
  getJobStatusDescription(): string;
}
