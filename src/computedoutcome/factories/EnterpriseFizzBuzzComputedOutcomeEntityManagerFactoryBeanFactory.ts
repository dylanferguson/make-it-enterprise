import type { IEntityManager } from "../persistence/IEntityManager.js";
import type { IPersistenceContext } from "../persistence/IPersistenceContext.js";
import { InMemoryEntityManagerImpl } from "../persistence/InMemoryEntityManagerImpl.js";

const FACTORY_BEAN_NAME = "EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-ENTITY-MANAGER-FACTORY-BEAN";

let entityManagerInstance: IEntityManager | null = null;

export class EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory {
  static getFactoryBeanName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_BEAN_VERSION;
  }

  static createEntityManager(
    persistenceContext: IPersistenceContext,
  ): IEntityManager {
    if (entityManagerInstance === null) {
      entityManagerInstance = new InMemoryEntityManagerImpl(persistenceContext);
      console.debug(
        `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] ` +
        `Enterprise entity manager created: ` +
        `manager=[${entityManagerInstance.getEntityManagerName()} v${entityManagerInstance.getEntityManagerVersion()}], ` +
        `persistenceContext=[${persistenceContext.getContextName()} v${persistenceContext.getContextVersion()}]`,
      );
    }
    return entityManagerInstance;
  }

  static getEntityManager(): IEntityManager | null {
    return entityManagerInstance;
  }

  static isManagerInitialized(): boolean {
    return entityManagerInstance !== null;
  }

  static resetManager(): void {
    entityManagerInstance = null;
    console.debug(
      `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] Entity manager reset`,
    );
  }
}
