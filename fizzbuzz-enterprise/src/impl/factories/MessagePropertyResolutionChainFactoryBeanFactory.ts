import type { IMessagePropertyResolutionChain } from "../../contracts/IMessagePropertyResolutionChain.js";
import { ChainedMessagePropertyResolutionChainImpl } from "../properties/ChainedMessagePropertyResolutionChainImpl.js";
import { SystemEnvironmentMessagePropertyConfigurationSourceImpl } from "../properties/SystemEnvironmentMessagePropertyConfigurationSourceImpl.js";
import { DeploymentDescriptorMessagePropertyConfigurationSourceImpl } from "../properties/DeploymentDescriptorMessagePropertyConfigurationSourceImpl.js";
import { StaticDefaultMessagePropertyConfigurationSourceImpl } from "../properties/StaticDefaultMessagePropertyConfigurationSourceImpl.js";

export class MessagePropertyResolutionChainFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "MessagePropertyResolutionChainFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-RESOLUTION-CHAIN-FACTORY";

  private static chain: IMessagePropertyResolutionChain | null = null;

  static createResolutionChain(): IMessagePropertyResolutionChain {
    if (MessagePropertyResolutionChainFactoryBeanFactory.chain === null) {
      const chain = new ChainedMessagePropertyResolutionChainImpl();
      chain.registerSource(new SystemEnvironmentMessagePropertyConfigurationSourceImpl());
      chain.registerSource(new DeploymentDescriptorMessagePropertyConfigurationSourceImpl());
      chain.registerSource(new StaticDefaultMessagePropertyConfigurationSourceImpl());
      MessagePropertyResolutionChainFactoryBeanFactory.chain = chain;
    }
    return MessagePropertyResolutionChainFactoryBeanFactory.chain;
  }

  static getResolutionChain(): IMessagePropertyResolutionChain | null {
    return MessagePropertyResolutionChainFactoryBeanFactory.chain;
  }

  static resetResolutionChain(): void {
    MessagePropertyResolutionChainFactoryBeanFactory.chain = null;
  }

  static getFactoryBeanName(): string {
    return MessagePropertyResolutionChainFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return MessagePropertyResolutionChainFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
