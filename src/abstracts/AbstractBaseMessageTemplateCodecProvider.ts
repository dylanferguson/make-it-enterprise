import type { IMessageTemplateCodecProvider } from "../contracts/IMessageTemplateCodecProvider.js";
import type { IMessagePropertyResolutionChain } from "../contracts/IMessagePropertyResolutionChain.js";

export abstract class AbstractBaseMessageTemplateCodecProvider implements IMessageTemplateCodecProvider {
  protected readonly propertyResolutionChain: IMessagePropertyResolutionChain;

  constructor(propertyResolutionChain: IMessagePropertyResolutionChain) {
    this.propertyResolutionChain = propertyResolutionChain;
  }

  abstract getProviderName(): string;
  abstract getProviderVersion(): string;

  getMessageTemplate(templateKey: string): string {
    return this.propertyResolutionChain.resolveProperty(templateKey);
  }

  abstract getFizzTemplate(): string;
  abstract getBuzzTemplate(): string;
  abstract getFizzBuzzTemplate(): string;
  abstract getDivisibleResultTemplate(): string;
  abstract getNotDivisibleResultTemplate(): string;

  getPropertyResolutionChain(): IMessagePropertyResolutionChain {
    return this.propertyResolutionChain;
  }
}
