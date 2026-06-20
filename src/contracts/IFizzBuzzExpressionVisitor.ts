import type { IFizzBuzzExpression } from "./IFizzBuzzExpression.js";

export interface IFizzBuzzExpressionVisitor {
  visitDivisibleBy(expression: IFizzBuzzExpression, divisor: number): void;
  visitAnd(expression: IFizzBuzzExpression, left: IFizzBuzzExpression, right: IFizzBuzzExpression): void;
  visitOr(expression: IFizzBuzzExpression, left: IFizzBuzzExpression, right: IFizzBuzzExpression): void;
  visitNot(expression: IFizzBuzzExpression, inner: IFizzBuzzExpression): void;
  visitTrue(expression: IFizzBuzzExpression): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
}
