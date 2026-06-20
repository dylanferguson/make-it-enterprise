export interface ITransactionManager {
  beginTransaction(): void;
  commitTransaction(): void;
  rollbackTransaction(): void;
  isTransactionActive(): boolean;
  getTransactionManagerName(): string;
  getTransactionTimeout(): number;
  setTransactionTimeout(timeoutMs: number): void;
}
