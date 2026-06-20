export interface IFizzBuzzExpression {
  interpret(value: number): boolean;
  getExpressionType(): string;
  getExpressionCanonicalForm(): string;
}

