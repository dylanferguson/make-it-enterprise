import type { IFizzBuzzComputedOutcomeEntity } from "../entities/IFizzBuzzComputedOutcomeEntity.js";
import { AbstractBaseEntityManager } from "./AbstractBaseEntityManager.js";
import type { IPersistenceContext } from "./IPersistenceContext.js";

const ENTITY_MANAGER_NAME = "InMemoryEntityManager";
const ENTITY_MANAGER_VERSION = "1.0.0-ENTITY-MANAGER-CMP";

export class InMemoryEntityManagerImpl extends AbstractBaseEntityManager {
  protected override readonly entityManagerName: string = ENTITY_MANAGER_NAME;
  protected override readonly entityManagerVersion: string = ENTITY_MANAGER_VERSION;

  constructor(persistenceContext: IPersistenceContext) {
    super(persistenceContext);
  }

  override persist(entity: IFizzBuzzComputedOutcomeEntity): void {
    entity.markManaged();
    this.persistenceContext.attachEntity(entity);
    console.debug(
      `[${ENTITY_MANAGER_NAME} v${ENTITY_MANAGER_VERSION}] ` +
      `Persisting entity pk=[${entity.getEntityPrimaryKey()}] ` +
      `input=[${entity.getInputValue()}] outcome=[${entity.getComputedOutcome()}]`,
    );
  }

  override merge(entity: IFizzBuzzComputedOutcomeEntity): IFizzBuzzComputedOutcomeEntity {
    const existing = this.persistenceContext.getEntity(entity.getEntityPrimaryKey());
    if (existing !== null) {
      existing.setComputedOutcome(entity.getComputedOutcome());
      existing.setInputValue(entity.getInputValue());
      return existing;
    }
    entity.markManaged();
    this.persistenceContext.attachEntity(entity);
    return entity;
  }

  override remove(entity: IFizzBuzzComputedOutcomeEntity): void {
    entity.ejbRemove();
    this.persistenceContext.detachEntity(entity.getEntityPrimaryKey());
    console.debug(
      `[${ENTITY_MANAGER_NAME} v${ENTITY_MANAGER_VERSION}] ` +
      `Removing entity pk=[${entity.getEntityPrimaryKey()}]`,
    );
  }

  override find(primaryKey: number): IFizzBuzzComputedOutcomeEntity | null {
    const entity = this.persistenceContext.getEntity(primaryKey);
    if (entity !== null) {
      entity.ejbLoad();
    }
    return entity;
  }

  override findAll(): readonly IFizzBuzzComputedOutcomeEntity[] {
    return this.persistenceContext.getAllEntities();
  }

  override flush(): void {
    for (const entity of this.persistenceContext.getAllEntities()) {
      if (entity.isDirty()) {
        entity.ejbStore();
      }
    }
    console.debug(
      `[${ENTITY_MANAGER_NAME} v${ENTITY_MANAGER_VERSION}] ` +
      `Flush completed: managed=[${this.persistenceContext.getEntityCount()}]`,
    );
  }

  override clear(): void {
    this.persistenceContext.clear();
    console.debug(
      `[${ENTITY_MANAGER_NAME} v${ENTITY_MANAGER_VERSION}] Persistence context cleared`,
    );
  }

  override contains(entity: IFizzBuzzComputedOutcomeEntity): boolean {
    return this.persistenceContext.contains(entity.getEntityPrimaryKey());
  }

  override getManagedEntityCount(): number {
    return this.persistenceContext.getEntityCount();
  }
}
