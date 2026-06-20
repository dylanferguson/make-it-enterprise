import type { IFizzBuzzExpressionVisitor } from "./IFizzBuzzExpressionVisitor.js";

export interface IFizzBuzzExpression {
  interpret(value: number): boolean;
  getExpressionType(): string;
  getExpressionCanonicalForm(): string;
  accept(visitor: IFizzBuzzExpressionVisitor): void;
}

