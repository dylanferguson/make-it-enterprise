import type { IFizzBuzzComputedOutcomeRepository } from "../repository/IFizzBuzzComputedOutcomeRepository.js";
import type { IEntityManager } from "../persistence/IEntityManager.js";
import type { IPersistenceContext } from "../persistence/IPersistenceContext.js";
import type { IFizzBuzzComputedOutcomeEntityHome } from "../entities/IFizzBuzzComputedOutcomeEntityHome.js";
import { EnterpriseFizzBuzzComputedOutcomePersistenceContextFactoryBeanFactory } from "./EnterpriseFizzBuzzComputedOutcomePersistenceContextFactoryBeanFactory.js";
import { EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory } from "./EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory.js";
import { EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory } from "./EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory.js";
import { EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory } from "./EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory.js";

const FACTORY_BEAN_NAME = "EnterpriseComputedOutcomeEntityInfrastructureInitializerFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-INFRASTRUCTURE-INITIALIZER-FACTORY-BEAN";

let infrastructureInitialized = false;

export interface EnterpriseComputedOutcomeEntityInfrastructure {
  persistenceContext: IPersistenceContext;
  entityManager: IEntityManager;
  repository: IFizzBuzzComputedOutcomeRepository;
  entityHome: IFizzBuzzComputedOutcomeEntityHome;
}

export class EnterpriseComputedOutcomeEntityInfrastructureInitializerFactoryBeanFactory {
  static getFactoryBeanName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_BEAN_VERSION;
  }

  static initializeInfrastructure(): EnterpriseComputedOutcomeEntityInfrastructure {
    if (infrastructureInitialized) {
      return {
        persistenceContext:
          EnterpriseFizzBuzzComputedOutcomePersistenceContextFactoryBeanFactory.getPersistenceContext()!,
        entityManager:
          EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory.getEntityManager()!,
        repository:
          EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory.getRepository()!,
        entityHome:
          EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory.getEntityHome()!,
      };
    }

    const persistenceContext =
      EnterpriseFizzBuzzComputedOutcomePersistenceContextFactoryBeanFactory.createPersistenceContext();
    const entityManager =
      EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory.createEntityManager(
        persistenceContext,
      );
    const repository =
      EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory.createRepository(
        entityManager,
      );
    const entityHome =
      EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory.createEntityHome();

    infrastructureInitialized = true;

    console.debug(
      `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] ` +
      `Enterprise computed outcome entity infrastructure initialized: ` +
      `persistenceContext=[${persistenceContext.getContextName()} v${persistenceContext.getContextVersion()}], ` +
      `entityManager=[${entityManager.getEntityManagerName()} v${entityManager.getEntityManagerVersion()}], ` +
      `repository=[${repository.getRepositoryName()} v${repository.getRepositoryVersion()}], ` +
      `entityHome=[${entityHome.getHomeName()} v${entityHome.getHomeVersion()}]`,
    );

    return {
      persistenceContext,
      entityManager,
      repository,
      entityHome,
    };
  }

  static isInfrastructureInitialized(): boolean {
    return infrastructureInitialized;
  }

  static resetInfrastructure(): void {
    EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory.resetRepository();
    EnterpriseFizzBuzzComputedOutcomeEntityManagerFactoryBeanFactory.resetManager();
    EnterpriseFizzBuzzComputedOutcomePersistenceContextFactoryBeanFactory.resetContext();
    EnterpriseFizzBuzzComputedOutcomeEntityHomeFactoryBeanFactory.resetHome();
    infrastructureInitialized = false;
    console.debug(
      `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] Infrastructure reset`,
    );
  }
}
