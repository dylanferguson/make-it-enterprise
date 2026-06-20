import type { IProtocolAwareEnterpriseServiceFacade } from "../../contracts/IProtocolAwareEnterpriseServiceFacade.js";
import type { IProtocolPhaseFactory } from "../../contracts/IProtocolPhaseFactory.js";
import type { IComputationProtocol } from "../../contracts/IComputationProtocol.js";
import type { IFizzBuzzEnterpriseServiceFacade } from "../../contracts/IFizzBuzzEnterpriseServiceFacade.js";
import { ProtocolAwareEnterpriseServiceFacadeImpl } from "../protocol/ProtocolAwareEnterpriseServiceFacadeImpl.js";
import { FizzBuzzComputationProtocolImpl } from "../protocol/FizzBuzzComputationProtocolImpl.js";
import { FizzBuzzProtocolPhaseFactoryImpl } from "../protocol/FizzBuzzProtocolPhaseFactoryImpl.js";

export class ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY";

  private static volatileInstance: IProtocolAwareEnterpriseServiceFacade | null = null;
  private static protocol: IComputationProtocol | null = null;
  private static sessionFactory: IProtocolPhaseFactory | null = null;

  static createProtocolAwareFacade(
    delegate: IFizzBuzzEnterpriseServiceFacade,
    protocolEnabled: boolean = true,
  ): IProtocolAwareEnterpriseServiceFacade {
    if (
      ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.volatileInstance === null
    ) {
      const effectiveSessionFactory =
        ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.sessionFactory ??
        new FizzBuzzProtocolPhaseFactoryImpl();

      const effectiveProtocol =
        ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.protocol ??
        new FizzBuzzComputationProtocolImpl(delegate);

      ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.sessionFactory = effectiveSessionFactory;
      ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.protocol = effectiveProtocol;

      ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.volatileInstance =
        new ProtocolAwareEnterpriseServiceFacadeImpl(
          delegate,
          effectiveProtocol,
          effectiveSessionFactory,
          protocolEnabled,
        );
    }
    return ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.volatileInstance;
  }

  static getProtocol(): IComputationProtocol | null {
    return ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.protocol;
  }

  static getSessionFactory(): IProtocolPhaseFactory | null {
    return ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.sessionFactory;
  }

  static resetProtocolAwareFacade(): void {
    ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.volatileInstance = null;
    ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.protocol = null;
    ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.sessionFactory = null;
  }

  static getFactoryBeanName(): string {
    return ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ProtocolAwareEnterpriseServiceFacadeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
