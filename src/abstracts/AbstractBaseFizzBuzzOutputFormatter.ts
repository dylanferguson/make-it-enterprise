import type { IFizzBuzzOutputFormatter } from "../contracts/IFizzBuzzOutputFormatter.js";
import type { IMessageTemplateCodecProvider } from "../contracts/IMessageTemplateCodecProvider.js";
import { MessageTemplateCodecProviderFactoryBeanFactory } from "../impl/factories/MessageTemplateCodecProviderFactoryBeanFactory.js";

export abstract class AbstractBaseFizzBuzzOutputFormatter implements IFizzBuzzOutputFormatter {
  protected readonly messageTemplateCodecProvider: IMessageTemplateCodecProvider;

  constructor(messageTemplateCodecProvider?: IMessageTemplateCodecProvider) {
    this.messageTemplateCodecProvider = messageTemplateCodecProvider
      ?? MessageTemplateCodecProviderFactoryBeanFactory.createCodecProvider();
  }

  abstract formatFizzBuzz(): string;
  abstract formatFizz(): string;
  abstract formatBuzz(): string;
  abstract formatDefault(value: number): string;

  protected sanitizeValue(value: number): number {
    return Math.trunc(value);
  }
}
