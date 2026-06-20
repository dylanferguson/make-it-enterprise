import { AbstractBaseBatchChunkOrientedItemWriter } from "../abstracts/AbstractBaseBatchChunkOrientedItemWriter.js";

export class FizzBuzzResultChunkOrientedItemCollectorWriterImpl
  extends AbstractBaseBatchChunkOrientedItemWriter<string>
{
  private static readonly WRITER_NAME = "FizzBuzzResultChunkOrientedItemCollectorWriter";
  private static readonly WRITER_VERSION = "1.0.0-CHUNK-ORIENTED-RESULT-COLLECTOR";

  private readonly results: string[] = [];

  constructor() {
    super(
      FizzBuzzResultChunkOrientedItemCollectorWriterImpl.WRITER_NAME,
      FizzBuzzResultChunkOrientedItemCollectorWriterImpl.WRITER_VERSION,
    );
  }

  override open(): void {
    this.markOpened();
  }

  override writeChunk(items: readonly string[]): void {
    if (!this.isOpened()) {
      throw new Error(`[${FizzBuzzResultChunkOrientedItemCollectorWriterImpl.WRITER_NAME}] Writer not opened before writeChunk()`);
    }
    for (const item of items) {
      this.results.push(item);
    }
    this.incrementWrittenCount(items.length);
  }

  override close(): void {
    this.markClosed();
  }

  getResults(): readonly string[] {
    return this.results;
  }
}
