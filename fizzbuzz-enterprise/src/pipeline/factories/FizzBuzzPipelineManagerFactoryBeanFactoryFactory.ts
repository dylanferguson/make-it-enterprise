import { FizzBuzzPipelineManagerFactoryBeanFactory } from "./FizzBuzzPipelineManagerFactoryBeanFactory.js";

export class FizzBuzzPipelineManagerFactoryBeanFactoryFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzPipelineManagerFactoryBeanFactoryFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PIPELINE-MANAGER-FACTORY-FACTORY";

  private static innerFactorySingleton: typeof FizzBuzzPipelineManagerFactoryBeanFactory | null = null;

  static createFactory(): typeof FizzBuzzPipelineManagerFactoryBeanFactory {
    if (FizzBuzzPipelineManagerFactoryBeanFactoryFactory.innerFactorySingleton === null) {
      FizzBuzzPipelineManagerFactoryBeanFactoryFactory.innerFactorySingleton =
        FizzBuzzPipelineManagerFactoryBeanFactory;
    }
    return FizzBuzzPipelineManagerFactoryBeanFactoryFactory.innerFactorySingleton;
  }

  static getFactoryName(): string {
    return FizzBuzzPipelineManagerFactoryBeanFactoryFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryVersion(): string {
    return FizzBuzzPipelineManagerFactoryBeanFactoryFactory.FACTORY_BEAN_VERSION;
  }
}
