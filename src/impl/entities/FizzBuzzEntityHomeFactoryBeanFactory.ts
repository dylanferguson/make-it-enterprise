import { FizzBuzzEntityHomeImpl } from "./FizzBuzzEntityHomeImpl.js";
import { FizzBuzzEntityPersistenceManagerImpl } from "./FizzBuzzEntityPersistenceManagerImpl.js";
import { FizzBuzzEjbQueryImpl } from "./FizzBuzzEjbQueryImpl.js";
import { EjbJarDeploymentDescriptorImpl } from "./EjbJarDeploymentDescriptorImpl.js";
import type { IFizzBuzzEntityHome } from "../../contracts/IFizzBuzzEntityHome.js";
import type { IEjbDeploymentDescriptor } from "../../contracts/IEjbDeploymentDescriptor.js";
import type { IFizzBuzzDao } from "../../contracts/IFizzBuzzDao.js";

export class FizzBuzzEntityHomeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzEntityHomeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "2.0.0-ENTITY-HOME-FACTORY";
  private static readonly DEFAULT_DESCRIPTOR_PATH = "META-INF/ejb-jar.xml";

  private static instance: IFizzBuzzEntityHome | null = null;
  private static persistenceManager: FizzBuzzEntityPersistenceManagerImpl | null = null;
  private static ejbQuery: FizzBuzzEjbQueryImpl | null = null;
  private static deploymentDescriptor: IEjbDeploymentDescriptor | null = null;

  static createEntityHome(
    dao: IFizzBuzzDao,
    descriptorPath?: string,
  ): IFizzBuzzEntityHome {
    const actualDescriptorPath = descriptorPath ?? FizzBuzzEntityHomeFactoryBeanFactory.DEFAULT_DESCRIPTOR_PATH;

    if (FizzBuzzEntityHomeFactoryBeanFactory.instance === null) {
      FizzBuzzEntityHomeFactoryBeanFactory.deploymentDescriptor =
        FizzBuzzEntityHomeFactoryBeanFactory.createDeploymentDescriptor(actualDescriptorPath);
      FizzBuzzEntityHomeFactoryBeanFactory.persistenceManager =
        new FizzBuzzEntityPersistenceManagerImpl(dao);
      FizzBuzzEntityHomeFactoryBeanFactory.ejbQuery =
        new FizzBuzzEjbQueryImpl(FizzBuzzEntityHomeFactoryBeanFactory.persistenceManager);

      const home = new FizzBuzzEntityHomeImpl(
        FizzBuzzEntityHomeFactoryBeanFactory.persistenceManager,
        FizzBuzzEntityHomeFactoryBeanFactory.ejbQuery,
      );

      const entityBeanNames = FizzBuzzEntityHomeFactoryBeanFactory.deploymentDescriptor.getEntityBeanNames();
      for (const beanName of entityBeanNames) {
        const finderMethods = FizzBuzzEntityHomeFactoryBeanFactory.deploymentDescriptor.getFinderMethods(beanName);
        for (const method of finderMethods) {
          home.registerFinderMethod(method.methodName, method.query);
          console.debug(
            `[${FizzBuzzEntityHomeFactoryBeanFactory.FACTORY_BEAN_NAME}] Finder method deployed: ${beanName}.${method.methodName}`,
          );
        }
      }

      FizzBuzzEntityHomeFactoryBeanFactory.instance = home;

      console.debug(
        `[${FizzBuzzEntityHomeFactoryBeanFactory.FACTORY_BEAN_NAME}] Entity home created with ${FizzBuzzEntityHomeFactoryBeanFactory.deploymentDescriptor.getEntityBeanNames().length} entity bean(s) from descriptor: ${actualDescriptorPath}`,
      );
    }

    return FizzBuzzEntityHomeFactoryBeanFactory.instance;
  }

  static getPersistenceManager(): FizzBuzzEntityPersistenceManagerImpl | null {
    return FizzBuzzEntityHomeFactoryBeanFactory.persistenceManager;
  }

  static getEjbQuery(): FizzBuzzEjbQueryImpl | null {
    return FizzBuzzEntityHomeFactoryBeanFactory.ejbQuery;
  }

  static getDeploymentDescriptor(): IEjbDeploymentDescriptor | null {
    return FizzBuzzEntityHomeFactoryBeanFactory.deploymentDescriptor;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzEntityHomeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzEntityHomeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetEntityHome(): void {
    FizzBuzzEntityHomeFactoryBeanFactory.instance = null;
    FizzBuzzEntityHomeFactoryBeanFactory.persistenceManager = null;
    FizzBuzzEntityHomeFactoryBeanFactory.ejbQuery = null;
    FizzBuzzEntityHomeFactoryBeanFactory.deploymentDescriptor = null;
  }

  private static createDeploymentDescriptor(_descriptorPath: string): IEjbDeploymentDescriptor {
    return new EjbJarDeploymentDescriptorImpl();
  }
}
