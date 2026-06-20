import { AbstractBaseEnterpriseDivisibilityExpression } from "../../abstracts/index.js";
import type { IEnterpriseDivisibilityExpression } from "../../contracts/index.js";

export class DivisibilityModuloExpressionImpl extends AbstractBaseEnterpriseDivisibilityExpression {
  private static readonly EXPRESSION_TYPE = "MODULO_REMAINDER_DIVISIBILITY_EXPRESSION";

  constructor(dividend: number, divisor: number) {
    super(
      dividend,
      divisor,
      `ModuloRemainderDivisibilityExpression[dividend=${dividend}, divisor=${divisor}]`,
      DivisibilityModuloExpressionImpl.EXPRESSION_TYPE,
    );
  }

  override clone(): IEnterpriseDivisibilityExpression {
    return new DivisibilityModuloExpressionImpl(this.getDividend(), this.getDivisor());
  }
}
