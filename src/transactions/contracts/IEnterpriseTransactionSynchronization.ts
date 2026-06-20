export type TransactionSynchronizationStatus = "ACTIVE" | "PRE_PARING" | "PREPARED" | "COMMITTING" | "COMMITTED" | "ROLLING_BACK" | "ROLLED_BACK" | "UNKNOWN";

export interface IEnterpriseTransactionSynchronization {
  beforeCompletion(): void;
  afterCompletion(status: TransactionSynchronizationStatus): void;
  getSynchronizationName(): string;
  getSynchronizationOrder(): number;
}
