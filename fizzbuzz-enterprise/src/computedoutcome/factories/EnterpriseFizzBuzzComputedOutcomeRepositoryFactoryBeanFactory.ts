import type { IEntityManager } from "../persistence/IEntityManager.js";
import type { IFizzBuzzComputedOutcomeRepository } from "../repository/IFizzBuzzComputedOutcomeRepository.js";
import { EntityManagerBackedFizzBuzzComputedOutcomeRepositoryImpl } from "../repository/EntityManagerBackedFizzBuzzComputedOutcomeRepositoryImpl.js";

const FACTORY_BEAN_NAME = "EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-REPOSITORY-FACTORY-BEAN";

let repositoryInstance: IFizzBuzzComputedOutcomeRepository | null = null;

export class EnterpriseFizzBuzzComputedOutcomeRepositoryFactoryBeanFactory {
  static getFactoryBeanName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_BEAN_VERSION;
  }

  static createRepository(entityManager: IEntityManager): IFizzBuzzComputedOutcomeRepository {
    if (repositoryInstance === null) {
      repositoryInstance = new EntityManagerBackedFizzBuzzComputedOutcomeRepositoryImpl(
        entityManager,
      );
      console.debug(
        `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] ` +
        `Enterprise computed outcome repository created: ` +
        `repository=[${repositoryInstance.getRepositoryName()} v${repositoryInstance.getRepositoryVersion()}], ` +
        `entityManager=[${entityManager.getEntityManagerName()} v${entityManager.getEntityManagerVersion()}]`,
      );
    }
    return repositoryInstance;
  }

  static getRepository(): IFizzBuzzComputedOutcomeRepository | null {
    return repositoryInstance;
  }

  static isRepositoryInitialized(): boolean {
    return repositoryInstance !== null;
  }

  static resetRepository(): void {
    repositoryInstance = null;
    console.debug(
      `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] Repository reset`,
    );
  }
}
