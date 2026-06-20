import type { IEjbHome } from "../contracts/IEjbHome.js";
import type { IEjbObject } from "../contracts/IEjbObject.js";
import type { IEjbJndiBinding } from "../contracts/IEjbJndiBinding.js";
import { FizzBuzzComputationEjbHomeImpl } from "../impl/FizzBuzzComputationEjbHomeImpl.js";
import { DefaultEjbJndiBindingImpl } from "../impl/DefaultEjbJndiBindingImpl.js";
import type { IRmiRemoteStub } from "../../rmi/contracts/IRmiRemoteStub.js";

export class EjbHomeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EjbHomeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-EJB-HOME-FACTORY-BEAN";

  private static readonly JNDI_EJB_NAME = "ejb/fizzbuzz/ComputationEJB";
  private static readonly HOME_INTERFACE_CLASS =
    "com.enterprise.fizzbuzz.ejb.contracts.IEjbHome";
  private static readonly REMOTE_INTERFACE_CLASS =
    "com.enterprise.fizzbuzz.ejb.contracts.IEjbObject";
  private static readonly EJB_CLASS =
    "com.enterprise.fizzbuzz.ejb.impl.FizzBuzzComputationEjbSessionBeanImpl";

  private static divisibilityEjbHome: FizzBuzzComputationEjbHomeImpl | null = null;
  private static ejbObject: IEjbObject | null = null;
  private static infrastructureInitialized = false;

  static getFactoryBeanName(): string {
    return EjbHomeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EjbHomeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static initializeEjbInfrastructure(
    rmiStub: IRmiRemoteStub,
    divisor: number,
  ): void {
    if (EjbHomeFactoryBeanFactory.infrastructureInitialized) return;
    EjbHomeFactoryBeanFactory.divisibilityEjbHome =
      new FizzBuzzComputationEjbHomeImpl(rmiStub, divisor);
    EjbHomeFactoryBeanFactory.ejbObject =
      EjbHomeFactoryBeanFactory.divisibilityEjbHome.create();
    EjbHomeFactoryBeanFactory.infrastructureInitialized = true;
    console.debug(
      `[${EjbHomeFactoryBeanFactory.FACTORY_BEAN_NAME}] EJB infrastructure initialized: ` +
      `home=[${EjbHomeFactoryBeanFactory.divisibilityEjbHome.getHomeName()} v${EjbHomeFactoryBeanFactory.divisibilityEjbHome.getHomeVersion()}], ` +
      `jndi=[${EjbHomeFactoryBeanFactory.divisibilityEjbHome.getJndiBindingName()}], ` +
      `beanHandle=[${EjbHomeFactoryBeanFactory.ejbObject.getEjbHandle()}], ` +
      `activeBeans=[${EjbHomeFactoryBeanFactory.divisibilityEjbHome.getActiveBeanCount()}], ` +
      `divisor=[${divisor}]`,
    );
  }

  static getHome(): FizzBuzzComputationEjbHomeImpl | null {
    return EjbHomeFactoryBeanFactory.divisibilityEjbHome;
  }

  static getEjbObject(): IEjbObject | null {
    return EjbHomeFactoryBeanFactory.ejbObject;
  }

  static isInfrastructureInitialized(): boolean {
    return EjbHomeFactoryBeanFactory.infrastructureInitialized;
  }

  static createDivisibilityHome(rmiStub: IRmiRemoteStub, divisor: number): FizzBuzzComputationEjbHomeImpl {
    return new FizzBuzzComputationEjbHomeImpl(rmiStub, divisor);
  }

  static createEjbBinding(): IEjbJndiBinding {
    return new DefaultEjbJndiBindingImpl(
      EjbHomeFactoryBeanFactory.JNDI_EJB_NAME,
      EjbHomeFactoryBeanFactory.HOME_INTERFACE_CLASS,
      EjbHomeFactoryBeanFactory.REMOTE_INTERFACE_CLASS,
      EjbHomeFactoryBeanFactory.EJB_CLASS,
    );
  }
}
