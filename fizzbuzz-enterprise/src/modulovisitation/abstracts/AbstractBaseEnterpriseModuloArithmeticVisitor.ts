import type { IEnterpriseModuloArithmeticVisitor } from "../contracts/IEnterpriseModuloArithmeticVisitor.js";

export abstract class AbstractBaseEnterpriseModuloArithmeticVisitor
  implements IEnterpriseModuloArithmeticVisitor
{
  protected static readonly DEFAULT_EVALUATION_CONTEXT = "ModuloArithmeticVisitorEvaluation";

  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;

  abstract visitModuloEvaluation(
    dividend: number,
    divisor: number,
    evaluationContext: string | null,
  ): number;

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.getVisitorName()}:${this.getVisitorVersion()}] Invalid dividend: ${dividend}`,
      );
    }
    if (!Number.isFinite(divisor) || divisor === 0) {
      throw new Error(
        `[${this.getVisitorName()}:${this.getVisitorVersion()}] Invalid divisor: ${divisor}`,
      );
    }
  }

  protected resolveContext(context: string | null): string {
    return context ?? AbstractBaseEnterpriseModuloArithmeticVisitor.DEFAULT_EVALUATION_CONTEXT;
  }
}
