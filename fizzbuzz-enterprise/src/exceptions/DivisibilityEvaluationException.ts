import { CalculationException } from "./CalculationException.js";

export class DivisibilityEvaluationException extends CalculationException {
  private readonly divisor: number;

  constructor(message: string, inputValue: number, divisor: number, cause: Error | null = null) {
    super(message, inputValue, cause);
    this.name = "DivisibilityEvaluationException";
    this.divisor = divisor;
  }

  getDivisor(): number {
    return this.divisor;
  }
}
