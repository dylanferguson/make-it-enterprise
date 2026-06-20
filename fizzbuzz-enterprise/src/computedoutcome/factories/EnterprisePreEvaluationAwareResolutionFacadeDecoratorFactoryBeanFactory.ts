import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandChain } from "../contracts/index.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandRegistry } from "../contracts/index.js";
import type { IPreEvaluationAwareResolutionFacadeDecorator } from "../contracts/index.js";
import { DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl } from "../impl/decorators/DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl.js";

export class EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PRE-EVAL-DECORATOR-FACTORY-BEAN";

  private static decoratorCache: DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl | null = null;
  private static initialized = false;

  static createDecorator(
    facade: IFizzBuzzSingleValueResolutionFacade,
    chain: IEnterpriseComputedOutcomePreEvaluationCommandChain,
    registry: IEnterpriseComputedOutcomePreEvaluationCommandRegistry,
  ): IPreEvaluationAwareResolutionFacadeDecorator {
    const decorator = new DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl(facade, chain, registry);
    EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache = decorator;
    EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.initialized = true;
    console.debug(
      `[${EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Pre-evaluation-aware decorator created: [${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `chain=[${chain.getChainName()} v${chain.getChainVersion()}], ` +
      `registry=[${registry.getRegistryName()} v${registry.getRegistryVersion()}], ` +
      `wrappedFacade=[${facade.getFacadeName()} v${facade.getFacadeVersion()}]`,
    );
    return decorator;
  }

  static createSingletonDecorator(
    facade: IFizzBuzzSingleValueResolutionFacade,
    chain: IEnterpriseComputedOutcomePreEvaluationCommandChain,
    registry: IEnterpriseComputedOutcomePreEvaluationCommandRegistry,
  ): IPreEvaluationAwareResolutionFacadeDecorator {
    if (EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache === null) {
      EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache =
        new DefaultPreEvaluationAwareResolutionFacadeDecoratorImpl(facade, chain, registry);
    }
    return EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache;
  }

  static getDecorator(): IPreEvaluationAwareResolutionFacadeDecorator | null {
    return EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache;
  }

  static isInitialized(): boolean {
    return EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.initialized;
  }

  static reset(): void {
    EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCache = null;
    EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.initialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterprisePreEvaluationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
