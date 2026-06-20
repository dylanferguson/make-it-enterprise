import type { IEnterpriseRemainderComputationProtocolStackFactory } from "../../contracts/IEnterpriseRemainderComputationProtocolStackFactory.js";
import type { IEnterpriseRemainderComputationProtocolStack } from "../../contracts/IEnterpriseRemainderComputationProtocolStack.js";
import { StandardEnterpriseRemainderComputationProtocolStackFactoryImpl } from "./StandardEnterpriseRemainderComputationProtocolStackFactoryImpl.js";

export class EnterpriseRemainderComputationProtocolStackFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseRemainderComputationProtocolStackFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN-FACTORY";

  private static factory: IEnterpriseRemainderComputationProtocolStackFactory | null = null;
  private static defaultStack: IEnterpriseRemainderComputationProtocolStack | null = null;
  private static initialized: boolean = false;

  static initializeFactoryBean(): void {
    if (!EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initialized) {
      EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.factory =
        new StandardEnterpriseRemainderComputationProtocolStackFactoryImpl();
      EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.defaultStack =
        EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.factory.createProtocolStack();
      EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initialized = true;
      console.debug(
        `[${EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
        `Protocol stack factory bean initialized: ` +
        `factory=[${EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.factory.getFactoryName()} v${EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.factory.getFactoryVersion()}], ` +
        `stack=[${EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.defaultStack.getStackName()} v${EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.defaultStack.getStackVersion()}], ` +
        `layers=[${EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.defaultStack.getRegisteredLayerCount()}]`,
      );
    }
  }

  static getOrCreateStackFactory(): IEnterpriseRemainderComputationProtocolStackFactory {
    EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initializeFactoryBean();
    return EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.factory!;
  }

  static getOrCreateDefaultProtocolStack(): IEnterpriseRemainderComputationProtocolStack {
    EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initializeFactoryBean();
    return EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.defaultStack!;
  }

  static createProtocolStackWithCustomLayers(layerIdentifiers: readonly string[]): IEnterpriseRemainderComputationProtocolStack {
    EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initializeFactoryBean();
    return EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.factory!
      .createProtocolStackWithCustomLayers(layerIdentifiers);
  }

  static resetFactory(): void {
    EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.factory = null;
    EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.defaultStack = null;
    EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initialized = false;
  }

  static isInitialized(): boolean {
    return EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.initialized;
  }

  static getFactoryBeanName(): string {
    return EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseRemainderComputationProtocolStackFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
