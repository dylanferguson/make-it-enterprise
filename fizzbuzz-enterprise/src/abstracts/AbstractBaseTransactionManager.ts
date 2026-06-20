import type { ITransactionManager } from "../contracts/ITransactionManager.js";

export abstract class AbstractBaseTransactionManager implements ITransactionManager {
  protected active: boolean = false;
  protected timeoutMs: number = 30000;

  abstract beginTransaction(): void;
  abstract commitTransaction(): void;
  abstract rollbackTransaction(): void;
  abstract getTransactionManagerName(): string;

  isTransactionActive(): boolean {
    return this.active;
  }

  getTransactionTimeout(): number {
    return this.timeoutMs;
  }

  setTransactionTimeout(timeoutMs: number): void {
    this.timeoutMs = timeoutMs;
  }

  protected assertNotActive(): void {
    if (this.active) {
      throw new Error(
        `[${this.getTransactionManagerName()}] Transaction already active`,
      );
    }
  }

  protected assertActive(): void {
    if (!this.active) {
      throw new Error(
        `[${this.getTransactionManagerName()}] No active transaction`,
      );
    }
  }

  protected markActive(): void {
    this.active = true;
  }

  protected markInactive(): void {
    this.active = false;
  }
}
