import type { IModuloRemainderComputationChainOfResponsibilityHandler } from "../contracts/index.js";
import { ValidationEnforcingModuloRemainderComputationChainHandlerImpl } from "../impl/chains/ValidationEnforcingModuloRemainderComputationChainHandlerImpl.js";
import { SlaMonitoringModuloRemainderComputationChainHandlerImpl } from "../impl/chains/SlaMonitoringModuloRemainderComputationChainHandlerImpl.js";

export class ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MRC-CHAIN-FBF";

  private static chainHead: IModuloRemainderComputationChainOfResponsibilityHandler | null = null;
  private static chainInitialized = false;

  static initializeChain(validationEnabled: boolean, slaMonitoringEnabled: boolean): void {
    if (ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.chainInitialized) {
      return;
    }

    let head: IModuloRemainderComputationChainOfResponsibilityHandler | null = null;
    let tail: IModuloRemainderComputationChainOfResponsibilityHandler | null = null;

    if (validationEnabled) {
      head = new ValidationEnforcingModuloRemainderComputationChainHandlerImpl();
      tail = head;
    }

    if (slaMonitoringEnabled) {
      const slaHandler = new SlaMonitoringModuloRemainderComputationChainHandlerImpl();
      if (head === null) {
        head = slaHandler;
        tail = slaHandler;
      } else {
        tail!.setNext(slaHandler);
        tail = slaHandler;
      }
    }

    ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.chainHead = head;
    ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.chainInitialized = true;
  }

  static getChainHead(): IModuloRemainderComputationChainOfResponsibilityHandler | null {
    return ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.chainHead;
  }

  static getFactoryBeanName(): string {
    return ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloRemainderComputationChainOfResponsibilityFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
