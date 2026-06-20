import { AbstractBaseEnterpriseDivisibilityExpressionFactory } from "../../abstracts/index.js";
import type { IEnterpriseDivisibilityExpression } from "../../contracts/index.js";
import { DivisibilityModuloExpressionImpl } from "../expressions/DivisibilityModuloExpressionImpl.js";

export class StandardDivisibilityExpressionFactoryImpl extends AbstractBaseEnterpriseDivisibilityExpressionFactory {
  private static readonly FACTORY_NAME = "StandardDivisibilityExpressionFactory";
  private static readonly FACTORY_VERSION = "1.0.0-STANDARD-EXPRESSION-FACTORY";

  private expressionCreationCount: number = 0;

  constructor() {
    super(
      StandardDivisibilityExpressionFactoryImpl.FACTORY_NAME,
      StandardDivisibilityExpressionFactoryImpl.FACTORY_VERSION,
    );
  }

  override createExpression(dividend: number, divisor: number): IEnterpriseDivisibilityExpression {
    this.expressionCreationCount++;
    return new DivisibilityModuloExpressionImpl(dividend, divisor);
  }

  getExpressionCreationCount(): number {
    return this.expressionCreationCount;
  }
}
