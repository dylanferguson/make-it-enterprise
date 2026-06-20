import { AbstractBaseEjbPersistenceManager } from "../../abstracts/AbstractBaseEjbPersistenceManager.js";
import { FizzBuzzEntityBeanImpl } from "./FizzBuzzEntityBeanImpl.js";
import type { IContainerManagedEntity } from "../../contracts/IContainerManagedEntity.js";
import type { IFizzBuzzValueTransferObject } from "../../contracts/IFizzBuzzValueTransferObject.js";
import type { IFizzBuzzDao } from "../../contracts/IFizzBuzzDao.js";

export class FizzBuzzEntityPersistenceManagerImpl extends AbstractBaseEjbPersistenceManager {
  private static readonly MANAGER_NAME = "FizzBuzzEntityPersistenceManager";
  private static readonly MANAGER_VERSION = "2.0.0-CMP-MANAGER";

  private readonly dao: IFizzBuzzDao;
  private entityCache: Map<unknown, FizzBuzzEntityBeanImpl> = new Map();

  constructor(dao: IFizzBuzzDao) {
    super();
    this.dao = dao;
  }

  override getPersistenceManagerName(): string {
    return FizzBuzzEntityPersistenceManagerImpl.MANAGER_NAME;
  }

  override getPersistenceManagerVersion(): string {
    return FizzBuzzEntityPersistenceManagerImpl.MANAGER_VERSION;
  }

  override loadEntity(primaryKey: unknown): IContainerManagedEntity | null {
    const cached = this.entityCache.get(primaryKey);
    if (cached !== undefined) {
      return cached;
    }
    const dto = this.dao.findById(primaryKey as number);
    if (dto === null) {
      return null;
    }
    const entity = new FizzBuzzEntityBeanImpl();
    entity.setPersistenceManager(this);
    entity.setEntityValue(dto.getValue());
    if (dto.getResult() !== null) {
      entity.setEntityResult(dto.getResult()!);
    }
    this.entityCache.set(primaryKey, entity);
    return entity;
  }

  override storeEntity(entity: IContainerManagedEntity): void {
    if (entity instanceof FizzBuzzEntityBeanImpl) {
      const value = entity.getEntityValue();
      const result = entity.getEntityResult();
      if (value !== null && result !== null) {
        this.dao.save(value, result);
        this.entityCache.set(value, entity);
      }
    }
  }

  override removeEntity(primaryKey: unknown): boolean {
    this.entityCache.delete(primaryKey);
    return this.dao.deleteById(primaryKey as number);
  }

  override findByPrimaryKey(primaryKey: unknown): IFizzBuzzValueTransferObject | null {
    return this.dao.findById(primaryKey as number);
  }

  override findAllEntities(): readonly IFizzBuzzValueTransferObject[] {
    return this.dao.findAll();
  }

  clearEntityCache(): void {
    this.entityCache.clear();
    console.debug(`[${this.getPersistenceManagerName()}] Entity cache cleared`);
  }

  getEntityCacheSize(): number {
    return this.entityCache.size;
  }
}
