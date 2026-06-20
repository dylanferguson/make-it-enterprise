export interface IMessageTemplateCodecProvider {
  getMessageTemplate(templateKey: string): string;
  getFizzTemplate(): string;
  getBuzzTemplate(): string;
  getFizzBuzzTemplate(): string;
  getDivisibleResultTemplate(): string;
  getNotDivisibleResultTemplate(): string;
  getProviderName(): string;
  getProviderVersion(): string;
}
