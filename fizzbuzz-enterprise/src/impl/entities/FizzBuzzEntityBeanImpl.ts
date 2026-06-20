import { AbstractBaseContainerManagedEntity } from "../../abstracts/AbstractBaseContainerManagedEntity.js";
import type { IEjbPersistenceManager } from "../../contracts/IEjbPersistenceManager.js";

export class FizzBuzzEntityBeanImpl extends AbstractBaseContainerManagedEntity {
  private static readonly ENTITY_NAME = "FizzBuzzEntityBean";
  private static readonly ENTITY_VERSION = "2.0.0-CMP-ENTITY";
  private static readonly ENTITY_SCHEMA_NAME = "FizzBuzzValue";

  private persistenceManager: IEjbPersistenceManager | null = null;
  private entityValue: number | null = null;
  private entityResult: string | null = null;
  private entityCreatedTimestamp: Date = new Date();

  constructor() {
    super();
  }

  setPersistenceManager(manager: IEjbPersistenceManager): void {
    this.persistenceManager = manager;
  }

  getPersistenceManager(): IEjbPersistenceManager | null {
    return this.persistenceManager;
  }

  getEntityValue(): number | null {
    return this.entityValue;
  }

  setEntityValue(value: number): void {
    if (this.entityValue !== value) {
      this.entityValue = value;
      this.setModified(true);
    }
  }

  getEntityResult(): string | null {
    return this.entityResult;
  }

  setEntityResult(result: string): void {
    if (this.entityResult !== result) {
      this.entityResult = result;
      this.setModified(true);
    }
  }

  getEntityCreatedTimestamp(): Date {
    return this.entityCreatedTimestamp;
  }

  setEntityCreatedTimestamp(timestamp: Date): void {
    this.entityCreatedTimestamp = timestamp;
  }

  override getEntityName(): string {
    return FizzBuzzEntityBeanImpl.ENTITY_NAME;
  }

  override getEntityVersion(): string {
    return FizzBuzzEntityBeanImpl.ENTITY_VERSION;
  }

  getEntitySchemaName(): string {
    return FizzBuzzEntityBeanImpl.ENTITY_SCHEMA_NAME;
  }

  protected override doEjbLoad(): boolean {
    if (this.primaryKey === null || this.persistenceManager === null) {
      console.warn(`[${this.getEntityName()}] ejbLoad skipped — no primary key or persistence manager`);
      return false;
    }
    const entity = this.persistenceManager.loadEntity(this.primaryKey);
    if (entity === null) {
      return false;
    }
    if (entity instanceof FizzBuzzEntityBeanImpl) {
      this.entityValue = entity.entityValue;
      this.entityResult = entity.entityResult;
      this.entityCreatedTimestamp = entity.entityCreatedTimestamp;
    }
    return true;
  }

  protected override doEjbStore(): void {
    if (this.persistenceManager !== null) {
      this.persistenceManager.storeEntity(this);
    }
  }

  protected override doEjbRemove(): void {
    if (this.primaryKey !== null && this.persistenceManager !== null) {
      this.persistenceManager.removeEntity(this.primaryKey);
    }
  }

  protected override preEjbCreate(primaryKey: unknown): void {
    this.entityCreatedTimestamp = new Date();
    if (typeof primaryKey === "number") {
      this.entityValue = primaryKey;
    }
  }

  protected override postEjbCreate(primaryKey: unknown): void {
    if (this.persistenceManager !== null && primaryKey !== null) {
      this.persistenceManager.storeEntity(this);
    }
  }
}
