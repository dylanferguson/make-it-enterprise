export interface IEnterpriseModuloArithmeticVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  visitModuloEvaluation(dividend: number, divisor: number, evaluationContext: string | null): number;
}
