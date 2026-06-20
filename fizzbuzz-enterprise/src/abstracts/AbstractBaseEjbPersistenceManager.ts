import type { IEjbPersistenceManager } from "../contracts/IEjbPersistenceManager.js";
import type { IContainerManagedEntity } from "../contracts/IContainerManagedEntity.js";
import type { IFizzBuzzValueTransferObject } from "../contracts/IFizzBuzzValueTransferObject.js";

export abstract class AbstractBaseEjbPersistenceManager implements IEjbPersistenceManager {
  protected transactionActive: boolean = false;
  protected dirtyEntities: Map<unknown, IContainerManagedEntity> = new Map();

  abstract getPersistenceManagerName(): string;
  abstract getPersistenceManagerVersion(): string;

  abstract loadEntity(primaryKey: unknown): IContainerManagedEntity | null;
  abstract storeEntity(entity: IContainerManagedEntity): void;
  abstract removeEntity(primaryKey: unknown): boolean;
  abstract findByPrimaryKey(primaryKey: unknown): IFizzBuzzValueTransferObject | null;
  abstract findAllEntities(): readonly IFizzBuzzValueTransferObject[];

  isContainerManaged(): boolean {
    return true;
  }

  beginTransaction(): void {
    this.preBeginTransaction();
    this.transactionActive = true;
    this.dirtyEntities.clear();
    this.postBeginTransaction();
    console.debug(`[${this.getPersistenceManagerName()}] Transaction begun`);
  }

  commitTransaction(): void {
    if (!this.transactionActive) {
      console.warn(`[${this.getPersistenceManagerName()}] No active transaction to commit`);
      return;
    }
    this.preCommitTransaction();
    this.flush();
    this.transactionActive = false;
    this.postCommitTransaction();
    console.debug(`[${this.getPersistenceManagerName()}] Transaction committed`);
  }

  rollbackTransaction(): void {
    if (!this.transactionActive) {
      console.warn(`[${this.getPersistenceManagerName()}] No active transaction to rollback`);
      return;
    }
    this.preRollbackTransaction();
    this.dirtyEntities.clear();
    this.transactionActive = false;
    this.postRollbackTransaction();
    console.debug(`[${this.getPersistenceManagerName()}] Transaction rolled back`);
  }

  flush(): void {
    this.preFlush();
    for (const [, entity] of this.dirtyEntities) {
      if (entity.isModified()) {
        this.storeEntity(entity);
      }
    }
    this.dirtyEntities.clear();
    this.postFlush();
  }

  protected markDirty(entity: IContainerManagedEntity): void {
    const pk = entity.getPrimaryKey();
    if (pk !== null) {
      this.dirtyEntities.set(pk, entity);
    }
  }

  protected preBeginTransaction(): void {}
  protected postBeginTransaction(): void {}
  protected preCommitTransaction(): void {}
  protected postCommitTransaction(): void {}
  protected preRollbackTransaction(): void {}
  protected postRollbackTransaction(): void {}
  protected preFlush(): void {}
  protected postFlush(): void {}
}
