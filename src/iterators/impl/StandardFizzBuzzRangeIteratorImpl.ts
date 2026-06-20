import { AbstractBaseFizzBuzzRangeIterator } from "../abstracts/AbstractBaseFizzBuzzRangeIterator.js";
import type { IFizzBuzzRangeIteratorResult } from "../contracts/IFizzBuzzRangeIterator.js";

export class StandardFizzBuzzRangeIteratorImpl extends AbstractBaseFizzBuzzRangeIterator {
  private static readonly ITERATOR_NAME = "StandardFizzBuzzRangeIterator";
  private static readonly ITERATOR_VERSION = "1.0.0-ITERATOR";
  private static readonly STRATEGY_IDENTIFIER = "STANDARD_FIZZBUZZ_RANGE_ITERATION_STRATEGY";

  private readonly innerResolver: (value: number) => string;
  private initialized: boolean = false;

  constructor(
    rangeStart: number,
    rangeEnd: number,
    innerResolver: (value: number) => string,
  ) {
    super(
      rangeStart,
      rangeEnd,
      StandardFizzBuzzRangeIteratorImpl.ITERATOR_NAME,
      StandardFizzBuzzRangeIteratorImpl.ITERATOR_VERSION,
    );
    this.innerResolver = innerResolver;
  }

  override hasNext(): boolean {
    return this.currentIndex <= this.rangeEnd;
  }

  override next(): IFizzBuzzRangeIteratorResult {
    this.validateIteratorState();
    if (!this.initialized) {
      this.startWallClockTimeMs = performance.now();
      this.initialized = true;
    }
    const value = this.currentIndex;
    const stepStart = performance.now();
    const resolved = this.resolveValue(value);
    const stepDurationMs = performance.now() - stepStart;
    const durationNs = Math.round(stepDurationMs * 1_000_000);
    const result = this.createResult(value, resolved, durationNs);
    this.currentIndex++;
    this.iterationCount++;
    return result;
  }

  override resolveValue(value: number): string {
    return this.innerResolver(value);
  }

  override getComputationStrategyIdentifier(): string {
    return StandardFizzBuzzRangeIteratorImpl.STRATEGY_IDENTIFIER;
  }

  override reset(): void {
    super.reset();
    this.initialized = false;
  }

  drainRemainingValues(): string[] {
    const results: string[] = [];
    while (this.hasNext()) {
      results.push(this.next().getValue());
    }
    return results;
  }

  getIteratorFactoryBeanFactoryName(): string {
    return "StandardFizzBuzzRangeIteratorFactoryBeanFactory";
  }

  getIteratorFactoryBeanFactoryVersion(): string {
    return "1.0.0-ITERATOR-FACTORY-BEAN-FACTORY";
  }
}
