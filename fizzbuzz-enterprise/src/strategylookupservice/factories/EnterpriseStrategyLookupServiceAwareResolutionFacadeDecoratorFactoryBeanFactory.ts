import type { IEnterpriseStrategyLookupService } from "../contracts/IEnterpriseStrategyLookupService.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator } from "../contracts/IEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator.js";
import { EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorImpl } from "../impl/EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorImpl.js";

export class EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DECORATOR-FACTORY-LOOKUP";

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    lookupService: IEnterpriseStrategyLookupService,
  ): IEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator {
    const decorator = new EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      lookupService,
    );
    console.debug(
      `[${EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Strategy lookup service aware resolution facade decorator created: ` +
      `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${decorator.getWrappedFacadeName()}], ` +
      `lookupService=[${lookupService.getLookupServiceName()} v${lookupService.getLookupServiceVersion()}], ` +
      `registeredStrategies=[${lookupService.getRegisteredStrategyNames().join(", ")}]`,
    );
    return decorator;
  }

  static getFactoryBeanName(): string {
    return EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseStrategyLookupServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
