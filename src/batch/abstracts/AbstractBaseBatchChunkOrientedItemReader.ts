import type { IBatchChunkOrientedItemReader } from "../contracts/index.js";

export abstract class AbstractBaseBatchChunkOrientedItemReader<T>
  implements IBatchChunkOrientedItemReader<T>
{
  private readonly readerName: string;
  private readonly readerVersion: string;
  private totalReadCount: number = 0;
  private opened: boolean = false;

  constructor(readerName: string, readerVersion: string) {
    this.readerName = readerName;
    this.readerVersion = readerVersion;
  }

  abstract open(): void;
  abstract readChunk(chunkSize: number): readonly T[];
  abstract hasMore(): boolean;
  abstract close(): void;

  getReaderName(): string {
    return this.readerName;
  }

  getReaderVersion(): string {
    return this.readerVersion;
  }

  getTotalReadCount(): number {
    return this.totalReadCount;
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

  protected incrementReadCount(increment: number): void {
    this.totalReadCount += increment;
  }
}
