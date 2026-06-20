import type { IFizzBuzzOutputFormatter } from "../contracts/IFizzBuzzOutputFormatter.js";

export abstract class AbstractBaseFizzBuzzOutputFormatter implements IFizzBuzzOutputFormatter {
  abstract formatFizzBuzz(): string;
  abstract formatFizz(): string;
  abstract formatBuzz(): string;
  abstract formatDefault(value: number): string;

  protected sanitizeValue(value: number): number {
    return Math.trunc(value);
  }
}
