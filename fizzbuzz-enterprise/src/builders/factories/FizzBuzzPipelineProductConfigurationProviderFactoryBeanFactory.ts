import type { IFizzBuzzPipelineProductConfigurationProvider } from "../contracts/IFizzBuzzPipelineProductConfigurationProvider.js";
import { DefaultFizzBuzzPipelineProductConfigurationProviderImpl } from "../impl/DefaultFizzBuzzPipelineProductConfigurationProviderImpl.js";
import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import { SlaThresholdValidatingPipelineProductDecoratorImpl } from "../patterns/SlaThresholdValidatingPipelineProductDecoratorImpl.js";
import { CachingPipelineProductDecoratorImpl } from "../patterns/CachingPipelineProductDecoratorImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "FizzBuzzPipelineProductConfigurationProviderFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-CONFIG-PROVIDER-FACTORY-BEAN-FACTORY";

let singletonProvider: IFizzBuzzPipelineProductConfigurationProvider | null = null;

export class FizzBuzzPipelineProductConfigurationProviderFactoryBeanFactory {
  static createConfigurationProvider(singleton: boolean = false): IFizzBuzzPipelineProductConfigurationProvider {
    if (singleton && singletonProvider !== null) {
      return singletonProvider;
    }
    const provider = new DefaultFizzBuzzPipelineProductConfigurationProviderImpl();
    if (singleton) {
      singletonProvider = provider;
    }
    console.debug(
      `[${FACTORY_BEAN_FACTORY_NAME}] Created configuration provider ` +
      `(singleton=${singleton}, name=${provider.getConfigurationProviderName()} v${provider.getConfigurationProviderVersion()}, ` +
      `profiles=[${provider.getRegisteredProfileNames().join(", ")}])`,
    );
    return provider;
  }

  static applyDecoratorChain(
    product: IFizzBuzzComputationPipelineProduct,
    decoratorChainProfile: string,
  ): IFizzBuzzComputationPipelineProduct {
    let decorated = product;
    switch (decoratorChainProfile) {
      case "FULL_DECORATOR_CHAIN":
        decorated = new CachingPipelineProductDecoratorImpl(decorated);
        decorated = new SlaThresholdValidatingPipelineProductDecoratorImpl(decorated);
        break;
      case "OBSERVABILITY_DECORATOR_CHAIN":
        decorated = new SlaThresholdValidatingPipelineProductDecoratorImpl(decorated);
        break;
      case "MINIMAL_DECORATOR_CHAIN":
        break;
      default:
        break;
    }
    return decorated;
  }

  static getSingletonProvider(): IFizzBuzzPipelineProductConfigurationProvider | null {
    return singletonProvider;
  }

  static reset(): void {
    singletonProvider = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
