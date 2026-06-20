import type { IEjbHome } from "../../ejb/contracts/IEjbHome.js";
import type { IEjbFacadeResolutionRoutingStrategy } from "../../contracts/IEjbFacadeResolutionRoutingStrategy.js";
import type {
  IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator,
} from "../../contracts/IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import { EjbFacadeResolutionRoutingStrategyImpl } from "../strategies/EjbFacadeResolutionRoutingStrategyImpl.js";
import { EnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecoratorImpl }
  from "../decorators/EnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecoratorImpl.js";

export class EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-JNDI-EJB-BRIDGE";

  private static ejbRoutingStrategy: IEjbFacadeResolutionRoutingStrategy | null = null;
  private static jndiEjbDecorator: IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator | null = null;
  private static infrastructureInitialized = false;

  static getFactoryBeanName(): string {
    return EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static initializeJndiEjbBridgeInfrastructure(ejbHome: IEjbHome): void {
    if (EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.infrastructureInitialized) return;
    EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.ejbRoutingStrategy =
      new EjbFacadeResolutionRoutingStrategyImpl(ejbHome);
    EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.infrastructureInitialized = true;
    console.debug(
      `[${EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.FACTORY_BEAN_NAME}] JNDI/EJB bridge infrastructure initialized: ` +
      `strategy=[${EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.ejbRoutingStrategy.getRoutingStrategyName()} ` +
      `v${EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.ejbRoutingStrategy.getRoutingStrategyVersion()}], ` +
      `ejbHome=[${ejbHome.getHomeName()} v${ejbHome.getHomeVersion()}], ` +
      `jndiBinding=[${ejbHome.getJndiBindingName()}]`,
    );
  }

  static createJndiEjbAwareDecorator(
    facade: IFizzBuzzSingleValueResolutionFacade,
    ejbRoutingEnabled: boolean = true,
  ): IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator {
    if (EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.ejbRoutingStrategy === null) {
      throw new Error(
        `[${EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.FACTORY_BEAN_NAME}] EJB routing strategy not initialized`,
      );
    }
    const decorator: IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator =
      new EnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecoratorImpl(
        facade,
        EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.ejbRoutingStrategy,
        ejbRoutingEnabled,
      );
    EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.jndiEjbDecorator = decorator;
    return decorator;
  }

  static getRoutingStrategy(): IEjbFacadeResolutionRoutingStrategy | null {
    return EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.ejbRoutingStrategy;
  }

  static getDecorator(): IEnterpriseJavaNamingDirectoryInterfaceAwareResolutionFacadeDecorator | null {
    return EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.jndiEjbDecorator;
  }

  static isInfrastructureInitialized(): boolean {
    return EnterpriseJndiEjbBridgeInfrastructureFactoryBeanFactory.infrastructureInitialized;
  }
}
