import { AbstractBaseEnterpriseTransactionSynchronizationRegistry } from "../abstracts/AbstractBaseEnterpriseTransactionSynchronizationRegistry.js";
import type { IEnterpriseTransactionSynchronization, TransactionSynchronizationStatus } from "../contracts/IEnterpriseTransactionSynchronization.js";

export class StandardEnterpriseTransactionSynchronizationRegistryImpl
  extends AbstractBaseEnterpriseTransactionSynchronizationRegistry
{
  private static readonly REGISTRY_NAME = "StandardEnterpriseTransactionSynchronizationRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-SYNC-REGISTRY";

  override registerInterposedSynchronization(
    synchronization: IEnterpriseTransactionSynchronization,
  ): void {
    this.synchronizations.push(synchronization);
    console.debug(
      `[${this.getRegistryName()} v${this.getRegistryVersion()}] ` +
      `Interposed synchronization registered: [${synchronization.getSynchronizationName()}] ` +
      `(order: ${synchronization.getSynchronizationOrder()})`,
    );
  }

  override getTransactionStatus(): TransactionSynchronizationStatus {
    return this.currentStatus;
  }

  override getTransactionKey(): string {
    return this.currentTransactionKey ?? "NO_ACTIVE_TRANSACTION";
  }

  override putResource(key: string, resource: unknown): void {
    this.transactionResources.set(key, resource);
  }

  override getResource(key: string): unknown | undefined {
    return this.transactionResources.get(key);
  }

  override notifyBeforeCompletion(): void {
    const ordered = this.getOrderedSynchronizations();
    for (const sync of ordered) {
      sync.beforeCompletion();
    }
    console.debug(
      `[${this.getRegistryName()} v${this.getRegistryVersion()}] ` +
      `Notified [${ordered.length}] synchronization(s) before completion`,
    );
  }

  override notifyAfterCompletion(status: TransactionSynchronizationStatus): void {
    this.currentStatus = status;
    const ordered = this.getOrderedSynchronizations();
    for (const sync of ordered) {
      sync.afterCompletion(status);
    }
    console.debug(
      `[${this.getRegistryName()} v${this.getRegistryVersion()}] ` +
      `Notified [${ordered.length}] synchronization(s) after completion with status [${status}]`,
    );
  }

  override getRegistryName(): string {
    return StandardEnterpriseTransactionSynchronizationRegistryImpl.REGISTRY_NAME;
  }

  override getRegistryVersion(): string {
    return StandardEnterpriseTransactionSynchronizationRegistryImpl.REGISTRY_VERSION;
  }

  override getRegisteredSynchronizationCount(): number {
    return this.synchronizations.length;
  }
}
