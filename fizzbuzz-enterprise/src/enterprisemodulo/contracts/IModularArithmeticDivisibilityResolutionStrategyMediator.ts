export interface IModularArithmeticDivisibilityResolutionStrategyMediator {
  getMediatorName(): string;
  getMediatorVersion(): string;
  getSupportedDivisor(): number;
  isDivisibleBy(value: number): boolean;
}
