export interface IBridgeComputationImplementor {
  getImplementorName(): string;
  getImplementorVersion(): string;
  computeRemainder(dividend: number, divisor: number): number;
  isExactDivisible(dividend: number, divisor: number): boolean;
}

