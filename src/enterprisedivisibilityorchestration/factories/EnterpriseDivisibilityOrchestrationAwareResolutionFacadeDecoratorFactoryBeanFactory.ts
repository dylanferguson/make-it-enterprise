import type { IEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator } from "../contracts/IEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityOrchestrationInvoker } from "../contracts/IEnterpriseDivisibilityOrchestrationInvoker.js";
import { StandardEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorImpl } from "../impl/StandardEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "EnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-DECORATOR-FACTORY-BEAN-FACTORY";

class DecoratorFactoryBeanImpl {
  private static readonly FACTORY_BEAN_IMPL_NAME = "EnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-DECORATOR-FACTORY-BEAN";

  createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    invoker: IEnterpriseDivisibilityOrchestrationInvoker,
    decoratorEnabled: boolean = true,
  ): IEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator {
    return new StandardEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      invoker,
      decoratorEnabled,
    );
  }

  getFactoryBeanName(): string {
    return DecoratorFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return DecoratorFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }
}

export class EnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static infrastructureInitialized = false;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    invoker: IEnterpriseDivisibilityOrchestrationInvoker,
    decoratorEnabled: boolean = true,
  ): IEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator {
    const factoryBean = new DecoratorFactoryBeanImpl();
    const decorator = factoryBean.createDecorator(wrappedFacade, invoker, decoratorEnabled);
    EnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorFactoryBeanFactory.infrastructureInitialized = true;
    return decorator;
  }

  static isDecoratorInfrastructureInitialized(): boolean {
    return EnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorFactoryBeanFactory.infrastructureInitialized;
  }

  static resetDecoratorInfrastructure(): void {
    EnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecoratorFactoryBeanFactory.infrastructureInitialized = false;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
