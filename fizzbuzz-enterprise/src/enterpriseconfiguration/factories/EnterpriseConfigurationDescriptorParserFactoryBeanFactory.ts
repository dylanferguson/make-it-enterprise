import { FizzBuzzEnterpriseConfigurationDescriptorParserImpl } from "../descriptors/FizzBuzzEnterpriseConfigurationDescriptorParserImpl.js";

export class EnterpriseConfigurationDescriptorParserFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseConfigurationDescriptorParserFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PARSER-FACTORY";
  private static readonly DEFAULT_CONFIG_PATH = "META-INF/fizzbuzz-enterprise-config.xml";

  private static parserSingleton: FizzBuzzEnterpriseConfigurationDescriptorParserImpl | null = null;

  static createParser(): FizzBuzzEnterpriseConfigurationDescriptorParserImpl {
    if (EnterpriseConfigurationDescriptorParserFactoryBeanFactory.parserSingleton === null) {
      EnterpriseConfigurationDescriptorParserFactoryBeanFactory.parserSingleton =
        new FizzBuzzEnterpriseConfigurationDescriptorParserImpl();
    }
    return EnterpriseConfigurationDescriptorParserFactoryBeanFactory.parserSingleton;
  }

  static createDefaultDescriptor() {
    return FizzBuzzEnterpriseConfigurationDescriptorParserImpl.createDefaultDescriptor();
  }

  static parseConfiguration(): ReturnType<typeof FizzBuzzEnterpriseConfigurationDescriptorParserImpl.parseDescriptorFromPath> {
    return FizzBuzzEnterpriseConfigurationDescriptorParserImpl.parseDescriptorFromPath(
      EnterpriseConfigurationDescriptorParserFactoryBeanFactory.DEFAULT_CONFIG_PATH,
    );
  }

  static getFactoryBeanName(): string {
    return EnterpriseConfigurationDescriptorParserFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseConfigurationDescriptorParserFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
