import type { IFizzBuzzRangeIteratorResult } from "../contracts/IFizzBuzzRangeIterator.js";

export class StandardFizzBuzzRangeIteratorResultImpl implements IFizzBuzzRangeIteratorResult {
  private static readonly RESULT_NAME = "StandardFizzBuzzRangeIteratorResult";
  private static readonly RESULT_VERSION = "1.0.0-ITERATOR-RESULT";

  private readonly index: number;
  private readonly value: string;
  private readonly computationDurationNanoseconds: number;
  private readonly computationStrategyIdentifier: string;

  constructor(
    index: number,
    value: string,
    computationDurationNanoseconds: number,
    computationStrategyIdentifier: string,
  ) {
    this.index = index;
    this.value = value;
    this.computationDurationNanoseconds = computationDurationNanoseconds;
    this.computationStrategyIdentifier = computationStrategyIdentifier;
  }

  getIndex(): number {
    return this.index;
  }

  getValue(): string {
    return this.value;
  }

  getComputationDurationNanoseconds(): number {
    return this.computationDurationNanoseconds;
  }

  getComputationStrategyIdentifier(): string {
    return this.computationStrategyIdentifier;
  }

  getResultName(): string {
    return StandardFizzBuzzRangeIteratorResultImpl.RESULT_NAME;
  }

  getResultVersion(): string {
    return StandardFizzBuzzRangeIteratorResultImpl.RESULT_VERSION;
  }
}
