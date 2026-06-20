import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator } from "../contracts/IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator.js";
import type { IEnterpriseUserTransaction } from "../contracts/IEnterpriseUserTransaction.js";
import type { IEnterpriseTransactionSynchronizationRegistry } from "../contracts/IEnterpriseTransactionSynchronizationRegistry.js";
import type { IEnterpriseTransactionRollbackStrategy } from "../contracts/IEnterpriseTransactionRollbackStrategy.js";
import { TransactionContextPropagatingResolutionFacadeDecoratorImpl } from "../impl/decorators/TransactionContextPropagatingResolutionFacadeDecoratorImpl.js";
import { EnterpriseUserTransactionFactoryBeanFactory } from "./EnterpriseUserTransactionFactoryBeanFactory.js";
import { EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory } from "./EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory.js";
import { EnterpriseTransactionRollbackStrategyFactoryBeanFactory } from "./EnterpriseTransactionRollbackStrategyFactoryBeanFactory.js";

export const TransactionPropagationDecoratorConfigurationProfile = {
  TRANSACTIONAL_REQUIRED: "TRANSACTIONAL_REQUIRED",
  TRANSACTIONAL_REQUIRES_NEW: "TRANSACTIONAL_REQUIRES_NEW",
  NON_TRANSACTIONAL: "NON_TRANSACTIONAL",
} as const;

export type TransactionPropagationDecoratorConfigurationProfile =
  (typeof TransactionPropagationDecoratorConfigurationProfile)[keyof typeof TransactionPropagationDecoratorConfigurationProfile];

const FACTORY_NAME = "EnterpriseTransactionContextPropagatingDecoratorFactoryBeanFactory";
const FACTORY_VERSION = "1.0.0-TX-DECORATOR-FACTORY";

let decoratorInstance: IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator | null = null;
let currentProfile: TransactionPropagationDecoratorConfigurationProfile = "TRANSACTIONAL_REQUIRED";

export class EnterpriseTransactionContextPropagatingDecoratorFactoryBeanFactory {
  static createDecorator(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    profile: TransactionPropagationDecoratorConfigurationProfile = "TRANSACTIONAL_REQUIRED",
  ): IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator {
    if (
      decoratorInstance === null ||
      currentProfile !== profile
    ) {
      currentProfile = profile;

      const userTransaction = EnterpriseUserTransactionFactoryBeanFactory.createUserTransaction();
      const syncRegistry =
        EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory.createRegistry();
      const rollbackStrategy =
        EnterpriseTransactionRollbackStrategyFactoryBeanFactory.createRollbackStrategy();

      let attributeType: string;
      switch (profile) {
        case "TRANSACTIONAL_REQUIRES_NEW":
          attributeType = "REQUIRES_NEW";
          break;
        case "NON_TRANSACTIONAL":
          attributeType = "NOT_SUPPORTED";
          break;
        case "TRANSACTIONAL_REQUIRED":
        default:
          attributeType = "REQUIRED";
          break;
      }

      decoratorInstance = new TransactionContextPropagatingResolutionFacadeDecoratorImpl(
        decoratedFacade,
        userTransaction,
        syncRegistry,
        rollbackStrategy,
        attributeType,
      );

      const decorator = decoratorInstance!;
      console.debug(
        `[${FACTORY_NAME} v${FACTORY_VERSION}] ` +
        `Transaction context propagating facade decorator created: ` +
        `profile=[${profile}], attributeType=[${attributeType}], ` +
        `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
        `wrappedFacade=[${decorator.getWrappedFacade().getFacadeName()}], ` +
        `userTransaction=[${userTransaction.getUserTransactionName()}], ` +
        `syncRegistry=[${syncRegistry.getRegistryName()}], ` +
        `rollbackStrategy=[${rollbackStrategy.getRollbackStrategyName()}]`,
      );
    }
    return decoratorInstance!;
  }

  static getDecorator(): IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator | null {
    return decoratorInstance;
  }

  static getCurrentProfile(): TransactionPropagationDecoratorConfigurationProfile {
    return currentProfile;
  }

  static resetDecorator(): void {
    decoratorInstance = null;
    currentProfile = "TRANSACTIONAL_REQUIRED";
  }

  static isDecoratorInitialized(): boolean {
    return decoratorInstance !== null;
  }

  static getFactoryName(): string {
    return FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return FACTORY_VERSION;
  }
}
