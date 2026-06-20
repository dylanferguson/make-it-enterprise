import type {
  IBatchChunkOrientedJob,
  IBatchChunkOrientedItemReader,
  IBatchChunkOrientedItemProcessor,
  IBatchChunkOrientedItemWriter,
  IBatchJobConfiguration,
  IBatchJobExecutionMonitor,
} from "../contracts/index.js";

export abstract class AbstractBaseBatchChunkOrientedJob<TInput, TOutput>
  implements IBatchChunkOrientedJob<TInput, TOutput>
{
  private readonly jobName: string;
  private readonly jobVersion: string;
  private readonly reader: IBatchChunkOrientedItemReader<TInput>;
  private readonly processor: IBatchChunkOrientedItemProcessor<TInput, TOutput>;
  private readonly writer: IBatchChunkOrientedItemWriter<TOutput>;
  private readonly configuration: IBatchJobConfiguration;
  private readonly executionMonitor: IBatchJobExecutionMonitor;

  constructor(
    jobName: string,
    jobVersion: string,
    reader: IBatchChunkOrientedItemReader<TInput>,
    processor: IBatchChunkOrientedItemProcessor<TInput, TOutput>,
    writer: IBatchChunkOrientedItemWriter<TOutput>,
    configuration: IBatchJobConfiguration,
    executionMonitor: IBatchJobExecutionMonitor,
  ) {
    this.jobName = jobName;
    this.jobVersion = jobVersion;
    this.reader = reader;
    this.processor = processor;
    this.writer = writer;
    this.configuration = configuration;
    this.executionMonitor = executionMonitor;
  }

  abstract execute(): readonly TOutput[];

  getJobName(): string {
    return this.jobName;
  }

  getJobVersion(): string {
    return this.jobVersion;
  }

  getConfiguration(): IBatchJobConfiguration {
    return this.configuration;
  }

  getExecutionMonitor(): IBatchJobExecutionMonitor {
    return this.executionMonitor;
  }

  getJobStatusDescription(): string {
    const monitor = this.executionMonitor;
    return `${this.jobName} v${this.jobVersion}: chunks=[started=${monitor.getTotalChunksStarted()}, completed=${monitor.getTotalChunksCompleted()}, failed=${monitor.getTotalChunksFailed()}], items=${monitor.getTotalItemsProcessed()}, avgTime=${monitor.getAverageProcessingTimeMs().toFixed(2)}ms`;
  }

  protected getReader(): IBatchChunkOrientedItemReader<TInput> {
    return this.reader;
  }

  protected getProcessor(): IBatchChunkOrientedItemProcessor<TInput, TOutput> {
    return this.processor;
  }

  protected getWriter(): IBatchChunkOrientedItemWriter<TOutput> {
    return this.writer;
  }
}
