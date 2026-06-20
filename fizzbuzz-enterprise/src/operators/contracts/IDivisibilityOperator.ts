export interface IDivisibilityOperator {
  getOperatorName(): string;
  getOperatorVersion(): string;
  isDivisibleBy(dividend: number, divisor: number): boolean;
}
