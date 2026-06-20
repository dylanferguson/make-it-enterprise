import type { ICompositeExpressionTreeFactory, ICompositeDivisibilityExpression } from "../contracts/index.js";
import { DivisibleByCompositeExpressionImpl } from "./expressions/DivisibleByCompositeExpressionImpl.js";
import { AndCompositeExpressionImpl } from "./expressions/AndCompositeExpressionImpl.js";
import { OrCompositeExpressionImpl } from "./expressions/OrCompositeExpressionImpl.js";
import { ValueExpressionImpl } from "./expressions/ValueExpressionImpl.js";

export class StandardCompositeExpressionTreeFactoryImpl
  implements ICompositeExpressionTreeFactory
{
  private static readonly FACTORY_NAME = "StandardCompositeExpressionTreeFactory";
  private static readonly FACTORY_VERSION = "1.0.0-CETF-ENTERPRISE";

  getFactoryName(): string {
    return StandardCompositeExpressionTreeFactoryImpl.FACTORY_NAME;
  }

  getFactoryVersion(): string {
    return StandardCompositeExpressionTreeFactoryImpl.FACTORY_VERSION;
  }

  createDivisibleByExpression(value: number, divisor: number): ICompositeDivisibilityExpression {
    return new DivisibleByCompositeExpressionImpl(value, divisor);
  }

  createAndExpression(
    left: ICompositeDivisibilityExpression,
    right: ICompositeDivisibilityExpression,
  ): ICompositeDivisibilityExpression {
    return new AndCompositeExpressionImpl(left, right);
  }

  createOrExpression(
    left: ICompositeDivisibilityExpression,
    right: ICompositeDivisibilityExpression,
  ): ICompositeDivisibilityExpression {
    return new OrCompositeExpressionImpl(left, right);
  }

  createValueExpression(value: number): ICompositeDivisibilityExpression {
    return new ValueExpressionImpl(value);
  }

  createStandardFizzBuzzExpressionTree(value: number): ICompositeDivisibilityExpression {
    const divBy3 = this.createDivisibleByExpression(value, 3);
    const divBy5 = this.createDivisibleByExpression(value, 5);
    const divBy15 = this.createDivisibleByExpression(value, 15);
    const divBy3And5 = this.createAndExpression(divBy3, divBy5);
    return this.createOrExpression(divBy3And5, this.createOrExpression(divBy3, divBy5));
  }
}
