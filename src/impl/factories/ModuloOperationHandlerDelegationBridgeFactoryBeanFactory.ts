import type { IModuloOperationHandlerDelegationBridge } from "../../contracts/IModuloOperationHandlerDelegationBridge.js";
import { DefaultModuloOperationHandlerDelegationBridgeImpl } from "../bridge/DefaultModuloOperationHandlerDelegationBridgeImpl.js";

export class ModuloOperationHandlerDelegationBridgeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ModuloOperationHandlerDelegationBridgeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENTERPRISE-BRIDGE-FACTORY";

  private static instance: IModuloOperationHandlerDelegationBridge | null = null;

  static createBridge(): IModuloOperationHandlerDelegationBridge {
    if (ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.instance === null) {
      ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.instance =
        new DefaultModuloOperationHandlerDelegationBridgeImpl();
      console.debug(
        `[${ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.FACTORY_BEAN_NAME}] Bridge instance created: ${ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.instance.getBridgeName()} v${ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.instance.getBridgeVersion()}`,
      );
    }
    return ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.instance!;
  }

  static resetBridge(): void {
    ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.instance = null;
  }

  static isBridgeInitialized(): boolean {
    return ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.instance !== null;
  }

  static getFactoryBeanName(): string {
    return ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloOperationHandlerDelegationBridgeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
