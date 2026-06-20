import type { IMessageTemplateCodecProvider } from "../../contracts/IMessageTemplateCodecProvider.js";
import type { IMessagePropertyResolutionChain } from "../../contracts/IMessagePropertyResolutionChain.js";
import { DefaultMessageTemplateCodecProviderImpl } from "../providers/codec/DefaultMessageTemplateCodecProviderImpl.js";
import { MessagePropertyResolutionChainFactoryBeanFactory } from "./MessagePropertyResolutionChainFactoryBeanFactory.js";

export class MessageTemplateCodecProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "MessageTemplateCodecProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CODEC-PROVIDER-FACTORY";

  private static provider: IMessageTemplateCodecProvider | null = null;

  static createCodecProvider(resolutionChain?: IMessagePropertyResolutionChain): IMessageTemplateCodecProvider {
    if (MessageTemplateCodecProviderFactoryBeanFactory.provider === null) {
      const chain = resolutionChain ?? MessagePropertyResolutionChainFactoryBeanFactory.createResolutionChain();
      MessageTemplateCodecProviderFactoryBeanFactory.provider = new DefaultMessageTemplateCodecProviderImpl(chain);
    }
    return MessageTemplateCodecProviderFactoryBeanFactory.provider;
  }

  static getCodecProvider(): IMessageTemplateCodecProvider | null {
    return MessageTemplateCodecProviderFactoryBeanFactory.provider;
  }

  static resetCodecProvider(): void {
    MessageTemplateCodecProviderFactoryBeanFactory.provider = null;
  }

  static getFactoryBeanName(): string {
    return MessageTemplateCodecProviderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return MessageTemplateCodecProviderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
