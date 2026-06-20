import type { IEnterpriseUserTransaction } from "../contracts/IEnterpriseUserTransaction.js";
import type { TransactionAttributeType } from "../contracts/IEnterpriseTransactionAttribute.js";

export abstract class AbstractBaseEnterpriseUserTransaction implements IEnterpriseUserTransaction {
  protected static readonly TRANSACTION_CONTEXT_PREFIX = "ENT-TX-CTX";

  protected rollbackOnly: boolean = false;
  protected timeoutSeconds: number = 30;
  protected status: TransactionAttributeType = "NEVER";

  abstract begin(): void;
  abstract commit(): void;
  abstract rollback(): void;
  abstract getUserTransactionName(): string;
  abstract getUserTransactionVersion(): string;

  setRollbackOnly(): void {
    this.rollbackOnly = true;
  }

  getStatus(): TransactionAttributeType {
    return this.status;
  }

  setTransactionTimeout(seconds: number): void {
    this.timeoutSeconds = seconds;
  }

  getTransactionTimeout(): number {
    return this.timeoutSeconds;
  }

  isRollbackOnly(): boolean {
    return this.rollbackOnly;
  }

  protected assertNotInTransaction(): void {
    if (this.status === "REQUIRED" || this.status === "REQUIRES_NEW") {
      throw new Error(
        `[${this.getUserTransactionName()} v${this.getUserTransactionVersion()}] ` +
        `Transaction already active with status [${this.status}]`,
      );
    }
  }

  protected assertInTransaction(): void {
    if (this.status !== "REQUIRED" && this.status !== "REQUIRES_NEW") {
      throw new Error(
        `[${this.getUserTransactionName()} v${this.getUserTransactionVersion()}] ` +
        `No active transaction. Current status: [${this.status}]`,
      );
    }
  }

  protected buildTransactionContextId(): string {
    return `${AbstractBaseEnterpriseUserTransaction.TRANSACTION_CONTEXT_PREFIX}:${Date.now()}:${Math.random().toString(36).substring(2, 12)}`;
  }
}
