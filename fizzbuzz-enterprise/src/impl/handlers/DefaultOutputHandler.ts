import { AbstractBaseHandler } from "../../abstracts/AbstractBaseHandler.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";

export class DefaultOutputHandler extends AbstractBaseHandler<number, string> {
  private readonly formatter: IFizzBuzzOutputFormatter;

  constructor(formatter: IFizzBuzzOutputFormatter) {
    super();
    this.formatter = formatter;
  }

  override handle(input: number): string {
    return this.formatter.formatDefault(input);
  }
}
