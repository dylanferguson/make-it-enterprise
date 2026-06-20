import type { ICorbaNamingService } from "../contracts/ICorbaNamingService.js";
import type { ICorbaObjectReference } from "../contracts/ICorbaObjectReference.js";
import { StandardCorbaNamingServiceImpl } from "../impl/StandardCorbaNamingServiceImpl.js";
import { StandardCorbaObjectReferenceImpl } from "../impl/StandardCorbaObjectReferenceImpl.js";

export class CorbaNamingServiceFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CorbaNamingServiceFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CORBA-FACTORY-BEAN";

  private static namingService: StandardCorbaNamingServiceImpl | null = null;
  private static infrastructureInitialized = false;

  static getFactoryBeanName(): string {
    return CorbaNamingServiceFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return CorbaNamingServiceFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static initializeCorbaInfrastructure(): ICorbaNamingService {
    CorbaNamingServiceFactoryBeanFactory.namingService = new StandardCorbaNamingServiceImpl();
    CorbaNamingServiceFactoryBeanFactory.infrastructureInitialized = true;
    return CorbaNamingServiceFactoryBeanFactory.namingService;
  }

  static getNamingService(): ICorbaNamingService | null {
    return CorbaNamingServiceFactoryBeanFactory.namingService;
  }

  static isInfrastructureInitialized(): boolean {
    return CorbaNamingServiceFactoryBeanFactory.infrastructureInitialized;
  }

  static createObjectReference(
    repositoryId: string,
    objectKey: string,
    target: unknown,
  ): ICorbaObjectReference {
    return new StandardCorbaObjectReferenceImpl(repositoryId, objectKey, target);
  }
}
