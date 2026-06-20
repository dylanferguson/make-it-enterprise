import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseClassificationAwareResolutionFacadeDecorator } from "../contracts/index.js";
import type { IEnterpriseClassificationStrategyProvider } from "../contracts/index.js";
import type { IEnterpriseClassificationVisitor } from "../contracts/index.js";
import { StandardEnterpriseClassificationAwareResolutionFacadeDecoratorImpl } from "../impl/decorators/StandardEnterpriseClassificationAwareResolutionFacadeDecoratorImpl.js";

export class EnterpriseClassificationAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseClassificationAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ECARDFBF";

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    classificationStrategyProvider: IEnterpriseClassificationStrategyProvider,
    classificationVisitor: IEnterpriseClassificationVisitor,
    decoratorEnabled: boolean = true,
  ): IEnterpriseClassificationAwareResolutionFacadeDecorator {
    const decorator = new StandardEnterpriseClassificationAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      classificationStrategyProvider,
      classificationVisitor,
    );
    console.debug(
      `[${EnterpriseClassificationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseClassificationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Enterprise classification-aware resolution facade decorator created: ` +
      `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${decorator.getWrappedFacadeName()}], ` +
      `enabled=[${decoratorEnabled}], ` +
      `provider=[${classificationStrategyProvider.getProviderName()}], ` +
      `visitor=[${classificationVisitor.getVisitorName()}]`,
    );
    return decorator;
  }

  static getFactoryBeanName(): string {
    return EnterpriseClassificationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseClassificationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
