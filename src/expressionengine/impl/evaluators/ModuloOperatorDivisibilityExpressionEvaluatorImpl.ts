import { AbstractBaseEnterpriseDivisibilityExpressionEvaluator } from "../../abstracts/index.js";
import type { IEnterpriseDivisibilityExpression, IEnterpriseDivisibilityExpressionEvaluationResult } from "../../contracts/index.js";
import { DivisiblityExpressionEvaluationResultImpl } from "../results/DivisiblityExpressionEvaluationResultImpl.js";

export class ModuloOperatorDivisibilityExpressionEvaluatorImpl extends AbstractBaseEnterpriseDivisibilityExpressionEvaluator {
  private static readonly EVALUATOR_NAME = "ModuloOperatorDivisibilityExpressionEvaluator";
  private static readonly EVALUATOR_VERSION = "1.0.0-MODULO-EXPRESSION-EVALUATOR";
  private static readonly SUPPORTED_EXPRESSION_TYPES = ["MODULO_REMAINDER_DIVISIBILITY_EXPRESSION"];

  private evaluationCount: number = 0;

  constructor() {
    super(
      ModuloOperatorDivisibilityExpressionEvaluatorImpl.EVALUATOR_NAME,
      ModuloOperatorDivisibilityExpressionEvaluatorImpl.EVALUATOR_VERSION,
    );
  }

  override getSupportedExpressionTypes(): readonly string[] {
    return ModuloOperatorDivisibilityExpressionEvaluatorImpl.SUPPORTED_EXPRESSION_TYPES;
  }

  override canEvaluate(expression: IEnterpriseDivisibilityExpression): boolean {
    return ModuloOperatorDivisibilityExpressionEvaluatorImpl.SUPPORTED_EXPRESSION_TYPES.includes(
      expression.getExpressionType(),
    );
  }

  override evaluate(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluationResult {
    this.evaluationCount++;
    const dividend = expression.getDividend();
    const divisor = expression.getDivisor();
    if (divisor === 0) {
      return new DivisiblityExpressionEvaluationResultImpl(
        dividend,
        divisor,
        false,
        `${ModuloOperatorDivisibilityExpressionEvaluatorImpl.EVALUATOR_NAME}::ZERO_DIVISOR_GUARD`,
      );
    }
    const isDivisible = dividend % divisor === 0;
    return new DivisiblityExpressionEvaluationResultImpl(
      dividend,
      divisor,
      isDivisible,
      `${ModuloOperatorDivisibilityExpressionEvaluatorImpl.EVALUATOR_NAME}::MODULO_OPERATOR_EVALUATION`,
    );
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }
}
