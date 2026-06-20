import type { IBatchChunkOrientedItemWriter } from "../contracts/index.js";

export abstract class AbstractBaseBatchChunkOrientedItemWriter<T>
  implements IBatchChunkOrientedItemWriter<T>
{
  private readonly writerName: string;
  private readonly writerVersion: string;
  private totalWrittenCount: number = 0;
  private opened: boolean = false;

  constructor(writerName: string, writerVersion: string) {
    this.writerName = writerName;
    this.writerVersion = writerVersion;
  }

  abstract open(): void;
  abstract writeChunk(items: readonly T[]): void;
  abstract close(): void;

  getWriterName(): string {
    return this.writerName;
  }

  getWriterVersion(): string {
    return this.writerVersion;
  }

  getTotalWrittenCount(): number {
    return this.totalWrittenCount;
  }

  protected isOpened(): boolean {
    return this.opened;
  }

  protected markOpened(): void {
    this.opened = true;
  }

  protected markClosed(): void {
    this.opened = false;
  }

  protected incrementWrittenCount(increment: number): void {
    this.totalWrittenCount += increment;
  }
}
