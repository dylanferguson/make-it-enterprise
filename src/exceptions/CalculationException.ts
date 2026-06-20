import { FizzBuzzEnterpriseException } from "./FizzBuzzEnterpriseException.js";

export class CalculationException extends FizzBuzzEnterpriseException {
  private readonly inputValue: number;

  constructor(message: string, inputValue: number, cause: Error | null = null) {
    super(message, "FIZZBUZZ-1001", cause);
    this.name = "CalculationException";
    this.inputValue = inputValue;
  }

  getInputValue(): number {
    return this.inputValue;
  }
}
