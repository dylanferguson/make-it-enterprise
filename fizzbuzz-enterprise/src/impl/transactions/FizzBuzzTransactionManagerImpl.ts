import { AbstractBaseTransactionManager } from "../../abstracts/AbstractBaseTransactionManager.js";

export class FizzBuzzTransactionManagerImpl extends AbstractBaseTransactionManager {
  private static readonly MANAGER_NAME = "FizzBuzzTransactionManager";
  private static readonly MANAGER_VERSION = "1.0.0-RELEASE";
  private transactionIdCounter: number = 0;
  private currentTransactionId: string | null = null;

  override beginTransaction(): void {
    this.assertNotActive();
    this.markActive();
    this.transactionIdCounter++;
    this.currentTransactionId = `TX-${this.transactionIdCounter}-${Date.now()}`;
    console.debug(
      `[${this.getTransactionManagerName()}] Transaction [${this.currentTransactionId}] started (timeout: ${this.timeoutMs}ms)`,
    );
  }

  override commitTransaction(): void {
    this.assertActive();
    const txId = this.currentTransactionId;
    this.markInactive();
    this.currentTransactionId = null;
    console.debug(
      `[${this.getTransactionManagerName()}] Transaction [${txId}] committed`,
    );
  }

  override rollbackTransaction(): void {
    this.assertActive();
    const txId = this.currentTransactionId;
    this.markInactive();
    this.currentTransactionId = null;
    console.debug(
      `[${this.getTransactionManagerName()}] Transaction [${txId}] rolled back`,
    );
  }

  override getTransactionManagerName(): string {
    return FizzBuzzTransactionManagerImpl.MANAGER_NAME;
  }

  getTransactionManagerVersion(): string {
    return FizzBuzzTransactionManagerImpl.MANAGER_VERSION;
  }

  getCurrentTransactionId(): string | null {
    return this.currentTransactionId;
  }
}
