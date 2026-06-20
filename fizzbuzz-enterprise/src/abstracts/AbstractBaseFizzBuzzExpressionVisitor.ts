import type { IFizzBuzzExpressionVisitor } from "../contracts/IFizzBuzzExpressionVisitor.js";
import type { IFizzBuzzExpression } from "../contracts/IFizzBuzzExpression.js";

export abstract class AbstractBaseFizzBuzzExpressionVisitor implements IFizzBuzzExpressionVisitor {
  abstract visitDivisibleBy(expression: IFizzBuzzExpression, divisor: number): void;
  abstract visitAnd(expression: IFizzBuzzExpression, left: IFizzBuzzExpression, right: IFizzBuzzExpression): void;
  abstract visitOr(expression: IFizzBuzzExpression, left: IFizzBuzzExpression, right: IFizzBuzzExpression): void;
  abstract visitNot(expression: IFizzBuzzExpression, inner: IFizzBuzzExpression): void;
  abstract visitTrue(expression: IFizzBuzzExpression): void;
  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;
}
