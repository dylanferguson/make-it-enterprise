import { AbstractBaseEnterpriseModuloArithmeticVisitor } from "../../abstracts/AbstractBaseEnterpriseModuloArithmeticVisitor.js";

export class StandardModuloArithmeticEvaluationVisitorImpl
  extends AbstractBaseEnterpriseModuloArithmeticVisitor
{
  private static readonly VISITOR_NAME = "StandardModuloArithmeticEvaluationVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-MODULO-VISITOR";
  private static readonly MIN_SAFE_DIVISOR = 1;

  private evaluationCount: number = 0;

  override getVisitorName(): string {
    return StandardModuloArithmeticEvaluationVisitorImpl.VISITOR_NAME;
  }

  override getVisitorVersion(): string {
    return StandardModuloArithmeticEvaluationVisitorImpl.VISITOR_VERSION;
  }

  override visitModuloEvaluation(
    dividend: number,
    divisor: number,
    evaluationContext: string | null,
  ): number {
    this.validateOperands(dividend, divisor);
    if (divisor < StandardModuloArithmeticEvaluationVisitorImpl.MIN_SAFE_DIVISOR) {
      throw new Error(
        `[${this.getVisitorName()}] Divisor below minimum safe threshold: ${divisor}`,
      );
    }
    this.evaluationCount++;
    const truncatedDividend = Math.trunc(dividend);
    const truncatedDivisor = Math.trunc(divisor);
    let result = truncatedDividend % truncatedDivisor;
    if (Object.is(result, -0)) {
      result = 0;
    }
    if (result < 0) {
      result = Math.abs(result);
    }
    return result;
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }
}
