import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputationResultPostProcessorProvider } from "../contracts/IEnterpriseComputationResultPostProcessor.js";
import { DefaultPostProcessorAwareResolutionFacadeDecoratorImpl } from "../decorators/DefaultPostProcessorAwareResolutionFacadeDecoratorImpl.js";
import { ComputationResultPostProcessorArchitectureFactoryBeanFactory } from "./ComputationResultPostProcessorArchitectureFactoryBeanFactory.js";

export class PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-POST-PROCESSOR-DECORATOR-FACTORY";

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    enabled: boolean = true,
  ): DefaultPostProcessorAwareResolutionFacadeDecoratorImpl {
    let provider: IEnterpriseComputationResultPostProcessorProvider;
    if (ComputationResultPostProcessorArchitectureFactoryBeanFactory.isArchitectureInitialized()) {
      provider = ComputationResultPostProcessorArchitectureFactoryBeanFactory.getProvider()!;
    } else {
      provider = ComputationResultPostProcessorArchitectureFactoryBeanFactory.initializeArchitecture();
    }
    const decorator = new DefaultPostProcessorAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      provider,
      enabled,
    );
    console.debug(
      `[${PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Post-processor aware facade decorator created: ` +
      `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${wrappedFacade.getFacadeName()} v${wrappedFacade.getFacadeVersion()}], ` +
      `provider=[${provider.getProviderName()} v${provider.getProviderVersion()}], ` +
      `processorChain=[${provider.getActiveProcessorChainDescriptor()}], ` +
      `decoratorEnabled=[${enabled}]`,
    );
    return decorator;
  }

  static getFactoryBeanName(): string {
    return PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return PostProcessorAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
