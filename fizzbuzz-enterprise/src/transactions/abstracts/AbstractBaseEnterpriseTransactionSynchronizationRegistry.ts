import type { IEnterpriseTransactionSynchronizationRegistry, IEnterpriseTransactionSynchronization, TransactionSynchronizationStatus } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseTransactionSynchronizationRegistry
  implements IEnterpriseTransactionSynchronizationRegistry
{
  protected synchronizations: IEnterpriseTransactionSynchronization[] = [];
  protected transactionResources: Map<string, unknown> = new Map();
  protected currentStatus: TransactionSynchronizationStatus = "UNKNOWN";
  protected currentTransactionKey: string | null = null;

  abstract registerInterposedSynchronization(synchronization: IEnterpriseTransactionSynchronization): void;
  abstract getTransactionStatus(): TransactionSynchronizationStatus;
  abstract getTransactionKey(): string;
  abstract putResource(key: string, resource: unknown): void;
  abstract getResource(key: string): unknown | undefined;
  abstract notifyBeforeCompletion(): void;
  abstract notifyAfterCompletion(status: TransactionSynchronizationStatus): void;
  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;
  abstract getRegisteredSynchronizationCount(): number;

  protected getOrderedSynchronizations(): IEnterpriseTransactionSynchronization[] {
    return [...this.synchronizations].sort(
      (a, b) => a.getSynchronizationOrder() - b.getSynchronizationOrder(),
    );
  }

  protected setStatus(status: TransactionSynchronizationStatus): void {
    this.currentStatus = status;
  }

  protected setTransactionKey(key: string): void {
    this.currentTransactionKey = key;
  }

  protected clearTransactionContext(): void {
    this.synchronizations = [];
    this.transactionResources.clear();
    this.currentStatus = "UNKNOWN";
    this.currentTransactionKey = null;
  }
}
