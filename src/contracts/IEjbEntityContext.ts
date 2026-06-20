import type { IContainerManagedEntity } from "./IContainerManagedEntity.js";

export interface IEjbEntityContext {
  getEntityBean(): IContainerManagedEntity | null;
  setEntityBean(entity: IContainerManagedEntity | null): void;
  getPrimaryKey(): unknown;
  setPrimaryKey(key: unknown): void;
  isTransactionActive(): boolean;
  setRollbackOnly(): void;
  getUserTransaction(): unknown;
  getDeploymentDescriptorName(): string;
  getEntityContextName(): string;
  lookupEnvironmentEntry(name: string): unknown;
  getEJBLocalObject(): unknown;
  getEJBObject(): unknown;
  timerServiceAvailable(): boolean;
}
