import type { IFizzBuzzRangeIterator, IFizzBuzzRangeIteratorResult } from "../contracts/IFizzBuzzRangeIterator.js";
import { StandardFizzBuzzRangeIteratorResultImpl } from "../impl/StandardFizzBuzzRangeIteratorResultImpl.js";

export abstract class AbstractBaseFizzBuzzRangeIterator implements IFizzBuzzRangeIterator {
  protected readonly rangeStart: number;
  protected readonly rangeEnd: number;
  protected currentIndex: number;
  protected iterationCount: number = 0;
  protected startWallClockTimeMs: number = 0;
  protected readonly iteratorName: string;
  protected readonly iteratorVersion: string;

  constructor(
    rangeStart: number,
    rangeEnd: number,
    iteratorName: string,
    iteratorVersion: string,
  ) {
    if (!Number.isFinite(rangeStart) || !Number.isFinite(rangeEnd)) {
      throw new Error(`[AbstractBaseFizzBuzzRangeIterator] Range bounds must be finite: [${rangeStart}, ${rangeEnd}]`);
    }
    if (rangeStart > rangeEnd) {
      throw new Error(`[AbstractBaseFizzBuzzRangeIterator] Range start (${rangeStart}) must not exceed range end (${rangeEnd})`);
    }
    this.rangeStart = rangeStart;
    this.rangeEnd = rangeEnd;
    this.currentIndex = rangeStart;
    this.iteratorName = iteratorName;
    this.iteratorVersion = iteratorVersion;
  }

  abstract hasNext(): boolean;
  abstract next(): IFizzBuzzRangeIteratorResult;
  abstract resolveValue(value: number): string;
  abstract getComputationStrategyIdentifier(): string;

  getIteratorName(): string {
    return this.iteratorName;
  }

  getIteratorVersion(): string {
    return this.iteratorVersion;
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }

  getRangeStart(): number {
    return this.rangeStart;
  }

  getRangeEnd(): number {
    return this.rangeEnd;
  }

  getTotalIterations(): number {
    return Math.max(0, this.rangeEnd - this.rangeStart + 1);
  }

  getIterationCount(): number {
    return this.iterationCount;
  }

  getElapsedWallClockTimeMs(): number {
    if (this.startWallClockTimeMs === 0) {
      return 0;
    }
    return performance.now() - this.startWallClockTimeMs;
  }

  reset(): void {
    this.currentIndex = this.rangeStart;
    this.iterationCount = 0;
    this.startWallClockTimeMs = 0;
  }

  protected createResult(value: number, result: string, durationNs: number): IFizzBuzzRangeIteratorResult {
    return new StandardFizzBuzzRangeIteratorResultImpl(
      value,
      result,
      durationNs,
      this.getComputationStrategyIdentifier(),
    );
  }

  protected getIteratorDisplayName(): string {
    return `Iterator[${this.iteratorName} v${this.iteratorVersion}]`;
  }

  protected validateIteratorState(): void {
    if (!this.hasNext()) {
      throw new Error(
        `[${this.getIteratorDisplayName()}] Iterator exhausted at index ${this.currentIndex} ` +
        `(range: [${this.rangeStart}, ${this.rangeEnd}], completed: ${this.iterationCount}/${this.getTotalIterations()})`,
      );
    }
  }
}
