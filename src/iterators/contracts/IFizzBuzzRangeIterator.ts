export interface IFizzBuzzRangeIteratorResult {
  getIndex(): number;
  getValue(): string;
  getComputationDurationNanoseconds(): number;
  getComputationStrategyIdentifier(): string;
}

export interface IFizzBuzzRangeIterator {
  getIteratorName(): string;
  getIteratorVersion(): string;
  hasNext(): boolean;
  next(): IFizzBuzzRangeIteratorResult;
  getCurrentIndex(): number;
  getRangeStart(): number;
  getRangeEnd(): number;
  getTotalIterations(): number;
  reset(): void;
  getIterationCount(): number;
  getElapsedWallClockTimeMs(): number;
}
