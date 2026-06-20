export interface IEnterpriseDivisibilityResolutionFacade {
  isDivisible(dividend: number, divisor: number): boolean;
  getFacadeName(): string;
  getFacadeVersion(): string;
  getResolutionStrategyDescription(): string;
}
