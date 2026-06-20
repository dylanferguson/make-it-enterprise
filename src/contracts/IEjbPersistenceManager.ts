import type { IContainerManagedEntity } from "./IContainerManagedEntity.js";
import type { IFizzBuzzValueTransferObject } from "./IFizzBuzzValueTransferObject.js";

export interface IEjbPersistenceManager {
  loadEntity(primaryKey: unknown): IContainerManagedEntity | null;
  storeEntity(entity: IContainerManagedEntity): void;
  removeEntity(primaryKey: unknown): boolean;
  findByPrimaryKey(primaryKey: unknown): IFizzBuzzValueTransferObject | null;
  findAllEntities(): readonly IFizzBuzzValueTransferObject[];
  getPersistenceManagerName(): string;
  getPersistenceManagerVersion(): string;
  isContainerManaged(): boolean;
  beginTransaction(): void;
  commitTransaction(): void;
  rollbackTransaction(): void;
  flush(): void;
}
