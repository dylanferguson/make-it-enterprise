import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator.js";
import { StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl } from "../impl/StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl.js";
import { EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory } from "./EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.js";

export class EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DIV-INTERCEPT-DECORATOR-FACTORY";

  private static decoratorSingleton: IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator | null = null;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
  ): IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator {
    const adapter = EnterpriseDivisibilityEvaluationInterceptorAdapterFactoryBeanFactory.getAdapter();
    if (adapter === null) {
      throw new Error(
        `[${EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
        `Enterprise divisibility evaluation interceptor adapter infrastructure not initialized. ` +
        `Cannot create decorator. Call initializeAdapterInfrastructure() first.`,
      );
    }
    const decorator = new StandardEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorImpl(
      wrappedFacade,
      adapter,
    );
    EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton = decorator;
    console.debug(
      `[${EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Enterprise divisibility evaluation interceptor adapter resolution facade decorator created: ` +
      `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `adapter=[${adapter.getAdapterName()} v${adapter.getAdapterVersion()}], ` +
      `wrappedFacade=[${wrappedFacade.getFacadeName()}], ` +
      `interceptorEnabled=[${decorator.isInterceptorAdapterEnabled()}], ` +
      `registeredDivisors=[${adapter.getRegisteredDivisors().join(", ")}]`,
    );
    return decorator;
  }

  static getDecorator(): IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator | null {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton;
  }

  static resetDecorator(): void {
    EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory.decoratorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
