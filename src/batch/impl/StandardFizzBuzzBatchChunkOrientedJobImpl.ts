import { AbstractBaseBatchChunkOrientedJob } from "../abstracts/AbstractBaseBatchChunkOrientedJob.js";
import type {
  IBatchChunkOrientedItemReader,
  IBatchChunkOrientedItemProcessor,
  IBatchChunkOrientedItemWriter,
  IBatchJobConfiguration,
  IBatchJobExecutionMonitor,
} from "../contracts/index.js";

export class StandardFizzBuzzBatchChunkOrientedJobImpl
  extends AbstractBaseBatchChunkOrientedJob<number, string>
{
  private static readonly JOB_NAME = "StandardFizzBuzzBatchChunkOrientedJob";
  private static readonly JOB_VERSION = "1.0.0-CHUNK-ORIENTED-BATCH-JOB";

  constructor(
    reader: IBatchChunkOrientedItemReader<number>,
    processor: IBatchChunkOrientedItemProcessor<number, string>,
    writer: IBatchChunkOrientedItemWriter<string>,
    configuration: IBatchJobConfiguration,
    executionMonitor: IBatchJobExecutionMonitor,
  ) {
    super(
      StandardFizzBuzzBatchChunkOrientedJobImpl.JOB_NAME,
      StandardFizzBuzzBatchChunkOrientedJobImpl.JOB_VERSION,
      reader,
      processor,
      writer,
      configuration,
      executionMonitor,
    );
  }

  override execute(): readonly string[] {
    const reader = this.getReader();
    const processor = this.getProcessor();
    const writer = this.getWriter();
    const configuration = this.getConfiguration();
    const executionMonitor = this.getExecutionMonitor();
    const chunkSize = configuration.getChunkSize();

    reader.open();
    writer.open();

    let chunkIndex = 0;
    while (reader.hasMore()) {
      executionMonitor.recordChunkStarted(chunkIndex);
      try {
        const inputChunk = reader.readChunk(chunkSize);
        const processedChunk: string[] = [];
        for (const item of inputChunk) {
          processedChunk.push(processor.processItem(item));
        }
        writer.writeChunk(processedChunk);
        executionMonitor.recordChunkCompleted(chunkIndex, inputChunk.length);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        executionMonitor.recordChunkFailed(chunkIndex, errorMsg);
        if (!configuration.isRetryEnabled()) {
          break;
        }
      }
      chunkIndex++;
    }

    writer.close();
    reader.close();

    return writer.getTotalWrittenCount() > 0
      ? (writer as unknown as { getResults: () => readonly string[] }).getResults()
      : [];
  }
}
