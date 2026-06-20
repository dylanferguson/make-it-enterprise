import type { IFizzBuzzComputedOutcomeEntity } from "../entities/IFizzBuzzComputedOutcomeEntity.js";
import type { IPersistenceContext } from "./IPersistenceContext.js";

export abstract class AbstractBasePersistenceContext implements IPersistenceContext {
  protected readonly managedEntities: Map<number, IFizzBuzzComputedOutcomeEntity> = new Map();
  protected abstract readonly contextName: string;
  protected abstract readonly contextVersion: string;

  abstract attachEntity(entity: IFizzBuzzComputedOutcomeEntity): void;
  abstract detachEntity(primaryKey: number): void;

  getEntity(primaryKey: number): IFizzBuzzComputedOutcomeEntity | null {
    return this.managedEntities.get(primaryKey) ?? null;
  }

  getAllEntities(): readonly IFizzBuzzComputedOutcomeEntity[] {
    return Array.from(this.managedEntities.values());
  }

  contains(primaryKey: number): boolean {
    return this.managedEntities.has(primaryKey);
  }

  clear(): void {
    for (const entity of this.managedEntities.values()) {
      entity.ejbRemove();
    }
    this.managedEntities.clear();
  }

  getEntityCount(): number {
    return this.managedEntities.size;
  }

  getContextName(): string {
    return this.contextName;
  }

  getContextVersion(): string {
    return this.contextVersion;
  }
}
