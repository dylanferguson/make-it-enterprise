import type { IFizzBuzzComputedOutcomeEntity } from "../entities/IFizzBuzzComputedOutcomeEntity.js";
import type { IEntityManager } from "./IEntityManager.js";
import type { IPersistenceContext } from "./IPersistenceContext.js";

export abstract class AbstractBaseEntityManager implements IEntityManager {
  protected readonly persistenceContext: IPersistenceContext;
  protected abstract readonly entityManagerName: string;
  protected abstract readonly entityManagerVersion: string;

  constructor(persistenceContext: IPersistenceContext) {
    this.persistenceContext = persistenceContext;
  }

  abstract persist(entity: IFizzBuzzComputedOutcomeEntity): void;
  abstract merge(entity: IFizzBuzzComputedOutcomeEntity): IFizzBuzzComputedOutcomeEntity;
  abstract remove(entity: IFizzBuzzComputedOutcomeEntity): void;
  abstract find(primaryKey: number): IFizzBuzzComputedOutcomeEntity | null;
  abstract findAll(): readonly IFizzBuzzComputedOutcomeEntity[];
  abstract flush(): void;
  abstract clear(): void;
  abstract contains(entity: IFizzBuzzComputedOutcomeEntity): boolean;

  getEntityManagerName(): string {
    return this.entityManagerName;
  }

  getEntityManagerVersion(): string {
    return this.entityManagerVersion;
  }

  abstract getManagedEntityCount(): number;
}
