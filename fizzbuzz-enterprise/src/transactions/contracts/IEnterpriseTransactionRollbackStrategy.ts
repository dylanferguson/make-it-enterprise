import type { TransactionAttributeType } from "./IEnterpriseTransactionAttribute.js";

export interface IEnterpriseTransactionRollbackStrategy {
  isRollbackRequired(error: Error): boolean;
  getRollbackCause(error: Error): string;
  getRollbackStrategyName(): string;
  getRollbackStrategyVersion(): string;
  getAttributeTriggers(): TransactionAttributeType[];
}
