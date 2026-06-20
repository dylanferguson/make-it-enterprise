import type { IEnterpriseUserTransaction } from "../contracts/IEnterpriseUserTransaction.js";
import type { IEnterpriseTransactionSynchronizationRegistry } from "../contracts/IEnterpriseTransactionSynchronizationRegistry.js";
import type { IEnterpriseTransactionRollbackStrategy } from "../contracts/IEnterpriseTransactionRollbackStrategy.js";
import type { IEnterpriseTransactionTimeoutConfigurationProvider } from "../contracts/IEnterpriseTransactionTimeoutConfigurationProvider.js";
import { EnterpriseUserTransactionFactoryBeanFactory } from "./EnterpriseUserTransactionFactoryBeanFactory.js";
import { EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory } from "./EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory.js";
import { EnterpriseTransactionRollbackStrategyFactoryBeanFactory } from "./EnterpriseTransactionRollbackStrategyFactoryBeanFactory.js";
import { EnterpriseTransactionTimeoutConfigurationProviderFactoryBeanFactory } from "./EnterpriseTransactionTimeoutConfigurationProviderFactoryBeanFactory.js";

const FACTORY_NAME = "EnterpriseTransactionInfrastructureInitializerFactoryBeanFactory";
const FACTORY_VERSION = "1.0.0-TX-INFRASTRUCTURE-INITIALIZER";

let infrastructureInitialized = false;

export interface EnterpriseTransactionInfrastructure {
  userTransaction: IEnterpriseUserTransaction;
  synchronizationRegistry: IEnterpriseTransactionSynchronizationRegistry;
  rollbackStrategy: IEnterpriseTransactionRollbackStrategy;
  timeoutConfigurationProvider: IEnterpriseTransactionTimeoutConfigurationProvider;
}

export class EnterpriseTransactionInfrastructureInitializerFactoryBeanFactory {
  static initializeInfrastructure(): EnterpriseTransactionInfrastructure {
    if (infrastructureInitialized) {
      return {
        userTransaction: EnterpriseUserTransactionFactoryBeanFactory.getUserTransaction()!,
        synchronizationRegistry: EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory.getRegistry()!,
        rollbackStrategy: EnterpriseTransactionRollbackStrategyFactoryBeanFactory.getRollbackStrategy()!,
        timeoutConfigurationProvider: EnterpriseTransactionTimeoutConfigurationProviderFactoryBeanFactory.getConfigurationProvider()!,
      };
    }

    const userTransaction = EnterpriseUserTransactionFactoryBeanFactory.createUserTransaction();
    const synchronizationRegistry =
      EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory.createRegistry();
    const rollbackStrategy =
      EnterpriseTransactionRollbackStrategyFactoryBeanFactory.createRollbackStrategy();
    const timeoutConfigurationProvider =
      EnterpriseTransactionTimeoutConfigurationProviderFactoryBeanFactory.createConfigurationProvider();

    infrastructureInitialized = true;

    console.debug(
      `[${FACTORY_NAME} v${FACTORY_VERSION}] ` +
      `Enterprise transaction infrastructure initialized: ` +
      `userTransaction=[${userTransaction.getUserTransactionName()} v${userTransaction.getUserTransactionVersion()}], ` +
      `syncRegistry=[${synchronizationRegistry.getRegistryName()} v${synchronizationRegistry.getRegistryVersion()}], ` +
      `rollbackStrategy=[${rollbackStrategy.getRollbackStrategyName()} v${rollbackStrategy.getRollbackStrategyVersion()}], ` +
      `timeoutConfig=[${timeoutConfigurationProvider.getConfigurationProviderName()} v${timeoutConfigurationProvider.getConfigurationProviderVersion()}], ` +
      `defaultTimeout=[${timeoutConfigurationProvider.getDefaultTimeoutSeconds()}s]`,
    );

    return {
      userTransaction,
      synchronizationRegistry,
      rollbackStrategy,
      timeoutConfigurationProvider,
    };
  }

  static isInfrastructureInitialized(): boolean {
    return infrastructureInitialized;
  }

  static resetInfrastructure(): void {
    EnterpriseUserTransactionFactoryBeanFactory.resetUserTransaction();
    EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory.resetRegistry();
    EnterpriseTransactionRollbackStrategyFactoryBeanFactory.resetRollbackStrategy();
    EnterpriseTransactionTimeoutConfigurationProviderFactoryBeanFactory.resetConfigurationProvider();
    infrastructureInitialized = false;
    console.debug(
      `[${FACTORY_NAME} v${FACTORY_VERSION}] ` +
      `Enterprise transaction infrastructure reset`,
    );
  }

  static getFactoryBeanName(): string {
    return FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_VERSION;
  }
}
