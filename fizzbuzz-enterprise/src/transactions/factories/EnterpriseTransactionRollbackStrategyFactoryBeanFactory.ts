import type { IEnterpriseTransactionRollbackStrategy } from "../contracts/IEnterpriseTransactionRollbackStrategy.js";
import { DefaultEnterpriseTransactionRollbackStrategyImpl } from "../impl/DefaultEnterpriseTransactionRollbackStrategyImpl.js";

const FACTORY_NAME = "EnterpriseTransactionRollbackStrategyFactoryBeanFactory";
const FACTORY_VERSION = "1.0.0-ROLLBACK-STRATEGY-FACTORY";

let rollbackStrategyInstance: IEnterpriseTransactionRollbackStrategy | null = null;

export class EnterpriseTransactionRollbackStrategyFactoryBeanFactory {
  static createRollbackStrategy(): IEnterpriseTransactionRollbackStrategy {
    if (rollbackStrategyInstance === null) {
      rollbackStrategyInstance = new DefaultEnterpriseTransactionRollbackStrategyImpl();
      console.debug(
        `[${FACTORY_NAME} v${FACTORY_VERSION}] ` +
        `Enterprise transaction rollback strategy created: ` +
        `name=[${rollbackStrategyInstance.getRollbackStrategyName()} v${rollbackStrategyInstance.getRollbackStrategyVersion()}], ` +
        `attributeTriggers=[${rollbackStrategyInstance.getAttributeTriggers().join(", ")}]`,
      );
    }
    return rollbackStrategyInstance;
  }

  static getRollbackStrategy(): IEnterpriseTransactionRollbackStrategy | null {
    return rollbackStrategyInstance;
  }

  static resetRollbackStrategy(): void {
    rollbackStrategyInstance = null;
  }

  static isInitialized(): boolean {
    return rollbackStrategyInstance !== null;
  }

  static getFactoryName(): string {
    return FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return FACTORY_VERSION;
  }
}
