import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseOrchestrationMediationService } from "../contracts/IEnterpriseOrchestrationMediationService.js";
import type { IEnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecorator } from "../contracts/IEnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecorator.js";
import { EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl } from "../decorators/EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl.js";
import { EnterpriseOrchestrationMediationServiceFactoryBeanFactory } from "./EnterpriseOrchestrationMediationServiceFactoryBeanFactory.js";

export class EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MEDIATION-DECORATOR-FACTORY";

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    enabled: boolean = true,
  ): IEnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecorator {
    const mediationService: IEnterpriseOrchestrationMediationService =
      EnterpriseOrchestrationMediationServiceFactoryBeanFactory.createMediationService(enabled);
    const decorator = new EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      mediationService,
      enabled,
    );
    console.debug(
      `[${EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
      `Enterprise orchestration mediation service aware facade decorator created: ` +
      `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `mediationService=[${mediationService.getServiceName()} v${mediationService.getServiceVersion()}], ` +
      `handlerChain=[${mediationService.getActiveHandlerChainDescriptor()}], ` +
      `wrappedFacade=[${wrappedFacade.getFacadeName()} v${wrappedFacade.getFacadeVersion()}], ` +
      `decoratorEnabled=[${enabled}]`,
    );
    return decorator;
  }

  static getFactoryBeanName(): string {
    return EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
