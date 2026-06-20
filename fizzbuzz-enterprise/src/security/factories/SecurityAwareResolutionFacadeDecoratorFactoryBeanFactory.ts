import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import { JaasSecurityInfrastructureProviderFactoryBean } from "./JaasSecurityInfrastructureProviderFactoryBean.js";
import { SecurityContextAwareResolutionFacadeDecoratorImpl } from "../impl/SecurityContextAwareResolutionFacadeDecoratorImpl.js";

const FACTORY_NAME = "SecurityAwareResolutionFacadeDecoratorFactoryBeanFactory";
const FACTORY_VERSION = "1.0.0-DECORATOR-FACTORY";

export class SecurityAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static decoratorCreated: boolean = false;

  static createDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
  ): IFizzBuzzSingleValueResolutionFacade {
    if (!JaasSecurityInfrastructureProviderFactoryBean.isInfrastructureInitialized()) {
      JaasSecurityInfrastructureProviderFactoryBean.initializeInfrastructure();
    }
    const securityContext = JaasSecurityInfrastructureProviderFactoryBean.getSecurityContext();
    if (securityContext === null) {
      console.warn(
        `[${FACTORY_NAME}] Security context not available, returning undecorated facade`,
      );
      return wrappedFacade;
    }
    const decorator = new SecurityContextAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      securityContext,
      true,
    );
    SecurityAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCreated = true;
    console.debug(
      `[${FACTORY_NAME}] Security-aware facade decorator created: ` +
      `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `wrappedFacade=[${decorator.getWrappedFacadeName()}], ` +
      `securityContext=[${securityContext.getSecurityContextName()} v${securityContext.getSecurityContextVersion()}], ` +
      `requiredRole=[${decorator.getRequiredRole()}], ` +
      `securityEnabled=[${decorator.isSecurityEnabled()}]`,
    );
    return decorator;
  }

  static isDecoratorCreated(): boolean {
    return SecurityAwareResolutionFacadeDecoratorFactoryBeanFactory.decoratorCreated;
  }

  static getFactoryName(): string {
    return FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return FACTORY_VERSION;
  }
}
