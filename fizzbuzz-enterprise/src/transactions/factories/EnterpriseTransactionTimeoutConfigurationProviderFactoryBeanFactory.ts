import type { IEnterpriseTransactionTimeoutConfigurationProvider } from "../contracts/IEnterpriseTransactionTimeoutConfigurationProvider.js";
import { TransactionConfigurableTimeoutConfigurationProviderImpl } from "../impl/TransactionConfigurableTimeoutConfigurationProviderImpl.js";

const FACTORY_NAME = "EnterpriseTransactionTimeoutConfigurationProviderFactoryBeanFactory";
const FACTORY_VERSION = "1.0.0-TIMEOUT-CONFIG-FACTORY";

let timeoutProviderInstance: IEnterpriseTransactionTimeoutConfigurationProvider | null = null;

export class EnterpriseTransactionTimeoutConfigurationProviderFactoryBeanFactory {
  static createConfigurationProvider(): IEnterpriseTransactionTimeoutConfigurationProvider {
    if (timeoutProviderInstance === null) {
      timeoutProviderInstance = new TransactionConfigurableTimeoutConfigurationProviderImpl();
      console.debug(
        `[${FACTORY_NAME} v${FACTORY_VERSION}] ` +
        `Enterprise transaction timeout configuration provider created: ` +
        `name=[${timeoutProviderInstance.getConfigurationProviderName()} v${timeoutProviderInstance.getConfigurationProviderVersion()}], ` +
        `defaultTimeout=[${timeoutProviderInstance.getDefaultTimeoutSeconds()}s], ` +
        `timeoutConfigurable=[${timeoutProviderInstance.isTimeoutConfigurable()}]`,
      );
    }
    return timeoutProviderInstance;
  }

  static getConfigurationProvider(): IEnterpriseTransactionTimeoutConfigurationProvider | null {
    return timeoutProviderInstance;
  }

  static resetConfigurationProvider(): void {
    timeoutProviderInstance = null;
  }

  static isInitialized(): boolean {
    return timeoutProviderInstance !== null;
  }

  static getFactoryName(): string {
    return FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return FACTORY_VERSION;
  }
}
