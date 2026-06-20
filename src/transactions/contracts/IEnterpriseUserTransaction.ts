import type { TransactionAttributeType } from "./IEnterpriseTransactionAttribute.js";

export interface IEnterpriseUserTransaction {
  begin(): void;
  commit(): void;
  rollback(): void;
  setRollbackOnly(): void;
  getStatus(): TransactionAttributeType;
  setTransactionTimeout(seconds: number): void;
  getTransactionTimeout(): number;
  getUserTransactionName(): string;
  getUserTransactionVersion(): string;
}
