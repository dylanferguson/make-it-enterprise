export interface IModularArithmeticDivisibilityResolutionMediationVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  visitMediatorEvaluation(value: number, divisor: number): boolean;
}
