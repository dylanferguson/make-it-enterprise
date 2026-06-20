import type { IFizzBuzzComputedOutcomeEntity } from "../entities/IFizzBuzzComputedOutcomeEntity.js";
import { AbstractBasePersistenceContext } from "./AbstractBasePersistenceContext.js";

const CONTEXT_NAME = "ThreadLocalPersistenceContext";
const CONTEXT_VERSION = "1.0.0-PERSISTENCE-CONTEXT-CMP";

export class ThreadLocalPersistenceContextImpl extends AbstractBasePersistenceContext {
  protected override readonly contextName: string = CONTEXT_NAME;
  protected override readonly contextVersion: string = CONTEXT_VERSION;

  override attachEntity(entity: IFizzBuzzComputedOutcomeEntity): void {
    entity.markManaged();
    this.managedEntities.set(entity.getEntityPrimaryKey(), entity);
    console.debug(
      `[${CONTEXT_NAME} v${CONTEXT_VERSION}] ` +
      `Entity attached pk=[${entity.getEntityPrimaryKey()}] ` +
      `totalManaged=[${this.managedEntities.size}]`,
    );
  }

  override detachEntity(primaryKey: number): void {
    this.managedEntities.delete(primaryKey);
    console.debug(
      `[${CONTEXT_NAME} v${CONTEXT_VERSION}] ` +
      `Entity detached pk=[${primaryKey}] ` +
      `totalManaged=[${this.managedEntities.size}]`,
    );
  }
}
