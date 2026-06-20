import type { IEnterpriseUserTransaction } from "../contracts/IEnterpriseUserTransaction.js";
import { StandardEnterpriseUserTransactionImpl } from "../impl/StandardEnterpriseUserTransactionImpl.js";

const FACTORY_NAME = "EnterpriseUserTransactionFactoryBeanFactory";
const FACTORY_VERSION = "1.0.0-USER-TX-FACTORY";

let userTransactionInstance: IEnterpriseUserTransaction | null = null;

export class EnterpriseUserTransactionFactoryBeanFactory {
  static createUserTransaction(): IEnterpriseUserTransaction {
    if (userTransactionInstance === null) {
      userTransactionInstance = new StandardEnterpriseUserTransactionImpl();
      console.debug(
        `[${FACTORY_NAME} v${FACTORY_VERSION}] ` +
        `Enterprise user transaction created: ` +
        `name=[${userTransactionInstance.getUserTransactionName()} v${userTransactionInstance.getUserTransactionVersion()}], ` +
        `defaultTimeout=[${userTransactionInstance.getTransactionTimeout()}s]`,
      );
    }
    return userTransactionInstance;
  }

  static getUserTransaction(): IEnterpriseUserTransaction | null {
    return userTransactionInstance;
  }

  static resetUserTransaction(): void {
    userTransactionInstance = null;
  }

  static isInitialized(): boolean {
    return userTransactionInstance !== null;
  }

  static getFactoryName(): string {
    return FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return FACTORY_VERSION;
  }
}
