import { AbstractBaseBatchChunkOrientedItemReader } from "../abstracts/AbstractBaseBatchChunkOrientedItemReader.js";

export class FizzBuzzRangeChunkOrientedItemReaderImpl extends AbstractBaseBatchChunkOrientedItemReader<number> {
  private static readonly READER_NAME = "FizzBuzzRangeChunkOrientedItemReader";
  private static readonly READER_VERSION = "1.0.0-CHUNK-ORIENTED-RANGE-READER";

  private readonly rangeStart: number;
  private readonly rangeEnd: number;
  private currentPosition: number;

  constructor(rangeStart: number, rangeEnd: number) {
    super(
      FizzBuzzRangeChunkOrientedItemReaderImpl.READER_NAME,
      FizzBuzzRangeChunkOrientedItemReaderImpl.READER_VERSION,
    );
    this.rangeStart = rangeStart;
    this.rangeEnd = rangeEnd;
    this.currentPosition = rangeStart;
  }

  override open(): void {
    this.markOpened();
    this.currentPosition = this.rangeStart;
  }

  override readChunk(chunkSize: number): readonly number[] {
    if (!this.isOpened()) {
      throw new Error(`[${FizzBuzzRangeChunkOrientedItemReaderImpl.READER_NAME}] Reader not opened before readChunk()`);
    }
    if (chunkSize <= 0) {
      throw new Error(`[${FizzBuzzRangeChunkOrientedItemReaderImpl.READER_NAME}] Invalid chunk size: ${chunkSize}`);
    }
    const chunk: number[] = [];
    const upperBound = Math.min(this.currentPosition + chunkSize - 1, this.rangeEnd);
    for (let i = this.currentPosition; i <= upperBound; i++) {
      chunk.push(i);
    }
    this.currentPosition = upperBound + 1;
    this.incrementReadCount(chunk.length);
    return chunk;
  }

  override hasMore(): boolean {
    return this.currentPosition <= this.rangeEnd;
  }

  override close(): void {
    this.markClosed();
  }

  getRangeStart(): number {
    return this.rangeStart;
  }

  getRangeEnd(): number {
    return this.rangeEnd;
  }
}
