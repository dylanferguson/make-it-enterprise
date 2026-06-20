import { AbstractBaseEnterpriseUserTransaction } from "../abstracts/AbstractBaseEnterpriseUserTransaction.js";

export class StandardEnterpriseUserTransactionImpl extends AbstractBaseEnterpriseUserTransaction {
  private static readonly USER_TRANSACTION_NAME = "StandardEnterpriseUserTransaction";
  private static readonly USER_TRANSACTION_VERSION = "1.0.0-USER-TRANSACTION";
  private static readonly DEFAULT_TX_TIMEOUT_SECONDS: number = 30;

  private transactionId: string | null = null;
  private transactionActive: boolean = false;

  constructor() {
    super();
    this.timeoutSeconds = StandardEnterpriseUserTransactionImpl.DEFAULT_TX_TIMEOUT_SECONDS;
  }

  override begin(): void {
    this.assertNotInTransaction();
    this.transactionId = this.buildTransactionContextId();
    this.transactionActive = true;
    this.status = "REQUIRED";
    this.rollbackOnly = false;
    console.debug(
      `[${this.getUserTransactionName()} v${this.getUserTransactionVersion()}] ` +
      `User transaction [${this.transactionId}] began (timeout: ${this.timeoutSeconds}s)`,
    );
  }

  override commit(): void {
    this.assertInTransaction();
    if (this.rollbackOnly) {
      this.rollback();
      return;
    }
    const txId = this.transactionId;
    this.transactionActive = false;
    this.transactionId = null;
    this.status = "NEVER";
    console.debug(
      `[${this.getUserTransactionName()} v${this.getUserTransactionVersion()}] ` +
      `User transaction [${txId}] committed`,
    );
  }

  override rollback(): void {
    this.assertInTransaction();
    const txId = this.transactionId;
    this.transactionActive = false;
    this.transactionId = null;
    this.status = "NEVER";
    this.rollbackOnly = false;
    console.debug(
      `[${this.getUserTransactionName()} v${this.getUserTransactionVersion()}] ` +
      `User transaction [${txId}] rolled back`,
    );
  }

  override getUserTransactionName(): string {
    return StandardEnterpriseUserTransactionImpl.USER_TRANSACTION_NAME;
  }

  override getUserTransactionVersion(): string {
    return StandardEnterpriseUserTransactionImpl.USER_TRANSACTION_VERSION;
  }

  isTransactionActive(): boolean {
    return this.transactionActive;
  }

  getCurrentTransactionId(): string | null {
    return this.transactionId;
  }
}
