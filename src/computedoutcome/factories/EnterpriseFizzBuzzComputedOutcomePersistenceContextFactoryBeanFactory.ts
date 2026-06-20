import type { IPersistenceContext } from "../persistence/IPersistenceContext.js";
import { ThreadLocalPersistenceContextImpl } from "../persistence/ThreadLocalPersistenceContextImpl.js";

const FACTORY_BEAN_NAME = "EnterpriseFizzBuzzComputedOutcomePersistenceContextFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-PERSISTENCE-CONTEXT-FACTORY-BEAN";

let persistenceContextInstance: IPersistenceContext | null = null;

export class EnterpriseFizzBuzzComputedOutcomePersistenceContextFactoryBeanFactory {
  static getFactoryBeanName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_BEAN_VERSION;
  }

  static createPersistenceContext(): IPersistenceContext {
    if (persistenceContextInstance === null) {
      persistenceContextInstance = new ThreadLocalPersistenceContextImpl();
      console.debug(
        `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] ` +
        `Enterprise persistence context created: ` +
        `context=[${persistenceContextInstance.getContextName()} v${persistenceContextInstance.getContextVersion()}]`,
      );
    }
    return persistenceContextInstance;
  }

  static getPersistenceContext(): IPersistenceContext | null {
    return persistenceContextInstance;
  }

  static isContextInitialized(): boolean {
    return persistenceContextInstance !== null;
  }

  static resetContext(): void {
    if (persistenceContextInstance !== null) {
      persistenceContextInstance.clear();
    }
    persistenceContextInstance = null;
    console.debug(
      `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] Persistence context reset`,
    );
  }
}
