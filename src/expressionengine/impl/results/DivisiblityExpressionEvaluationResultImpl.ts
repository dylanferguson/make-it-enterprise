import { AbstractBaseEnterpriseDivisibilityExpressionEvaluationResult } from "../../abstracts/index.js";

export class DivisiblityExpressionEvaluationResultImpl extends AbstractBaseEnterpriseDivisibilityExpressionEvaluationResult {
  private static readonly RESULT_DESCRIPTOR_PREFIX = "MODULO_DIVISIBILITY_EVALUATION_RESULT";

  constructor(dividend: number, divisor: number, isDivisible: boolean, evaluatorIdentifier: string) {
    super(dividend, divisor, isDivisible, evaluatorIdentifier);
  }

  override getResultDescriptor(): string {
    return `${DivisiblityExpressionEvaluationResultImpl.RESULT_DESCRIPTOR_PREFIX}[dividend=${this.getDividend()}, divisor=${this.getDivisor()}, divisible=${this.isDivisible()}]`;
  }
}
