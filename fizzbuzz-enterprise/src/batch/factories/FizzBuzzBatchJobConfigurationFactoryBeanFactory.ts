import { DefaultFizzBuzzBatchJobConfigurationImpl } from "../impl/DefaultFizzBuzzBatchJobConfigurationImpl.js";

export class FizzBuzzBatchJobConfigurationFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzBatchJobConfigurationFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CONFIG-FACTORY-BEAN";

  private static configurationInstance: DefaultFizzBuzzBatchJobConfigurationImpl | null = null;

  static createConfiguration(): DefaultFizzBuzzBatchJobConfigurationImpl {
    if (FizzBuzzBatchJobConfigurationFactoryBeanFactory.configurationInstance === null) {
      FizzBuzzBatchJobConfigurationFactoryBeanFactory.configurationInstance =
        new DefaultFizzBuzzBatchJobConfigurationImpl();
    }
    return FizzBuzzBatchJobConfigurationFactoryBeanFactory.configurationInstance;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzBatchJobConfigurationFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzBatchJobConfigurationFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactory(): void {
    FizzBuzzBatchJobConfigurationFactoryBeanFactory.configurationInstance = null;
  }
}
