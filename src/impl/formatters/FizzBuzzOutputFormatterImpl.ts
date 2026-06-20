import { AbstractBaseFizzBuzzOutputFormatter } from "../../abstracts/AbstractBaseFizzBuzzOutputFormatter.js";

export class FizzBuzzOutputFormatterImpl extends AbstractBaseFizzBuzzOutputFormatter {
  override formatFizzBuzz(): string {
    return "FizzBuzz";
  }

  override formatFizz(): string {
    return "Fizz";
  }

  override formatBuzz(): string {
    return "Buzz";
  }

  override formatDefault(value: number): string {
    const sanitized = this.sanitizeValue(value);
    return String(sanitized);
  }
}
