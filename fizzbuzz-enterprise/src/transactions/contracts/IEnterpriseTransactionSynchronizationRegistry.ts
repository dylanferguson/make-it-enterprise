import type { IEnterpriseTransactionSynchronization, TransactionSynchronizationStatus } from "./IEnterpriseTransactionSynchronization.js";

export interface IEnterpriseTransactionSynchronizationRegistry {
  registerInterposedSynchronization(synchronization: IEnterpriseTransactionSynchronization): void;
  getTransactionStatus(): TransactionSynchronizationStatus;
  getTransactionKey(): string;
  putResource(key: string, resource: unknown): void;
  getResource(key: string): unknown | undefined;
  notifyBeforeCompletion(): void;
  notifyAfterCompletion(status: TransactionSynchronizationStatus): void;
  getRegistryName(): string;
  getRegistryVersion(): string;
  getRegisteredSynchronizationCount(): number;
}
