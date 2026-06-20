import { AbstractBaseFizzBuzzOutputFormatter } from "../../abstracts/AbstractBaseFizzBuzzOutputFormatter.js";
import type { IMessageTemplateCodecProvider } from "../../contracts/IMessageTemplateCodecProvider.js";

export class FizzBuzzOutputFormatterImpl extends AbstractBaseFizzBuzzOutputFormatter {
  constructor(messageTemplateCodecProvider?: IMessageTemplateCodecProvider) {
    super(messageTemplateCodecProvider);
  }

  override formatFizzBuzz(): string {
    return this.messageTemplateCodecProvider.getFizzBuzzTemplate();
  }

  override formatFizz(): string {
    return this.messageTemplateCodecProvider.getFizzTemplate();
  }

  override formatBuzz(): string {
    return this.messageTemplateCodecProvider.getBuzzTemplate();
  }

  override formatDefault(value: number): string {
    const sanitized = this.sanitizeValue(value);
    return String(sanitized);
  }
}
