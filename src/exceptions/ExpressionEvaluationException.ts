import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class ExpressionEvaluationException extends FizzBuzzEnterpriseException {
  private readonly expressionType: string;
  private readonly inputValue: number;

  constructor(
    message: string,
    expressionType: string,
    inputValue: number,
    cause: Error | null = null,
  ) {
    const detail = `[ExpressionEvaluationException] Expression '${expressionType}' failed for input ${inputValue}: ${message}`;
    super(detail, "FIZZBUZZ-4001", cause);
    this.name = "ExpressionEvaluationException";
    this.expressionType = expressionType;
    this.inputValue = inputValue;
  }

  getExpressionType(): string {
    return this.expressionType;
  }

  getInputValue(): number {
    return this.inputValue;
  }
}

