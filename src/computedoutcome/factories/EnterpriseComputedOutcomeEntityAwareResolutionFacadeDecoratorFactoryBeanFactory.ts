import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IPreEvaluationAwareResolutionFacadeDecorator } from "../contracts/index.js";
import type { IEntityManager } from "../persistence/IEntityManager.js";
import type { IFizzBuzzComputedOutcomeRepository } from "../repository/IFizzBuzzComputedOutcomeRepository.js";
import type { IFizzBuzzComputedOutcomeEntityHome } from "../entities/IFizzBuzzComputedOutcomeEntityHome.js";
import { EntityAwareComputedOutcomeResolutionFacadeDecoratorImpl } from "../impl/decorators/EntityAwareComputedOutcomeResolutionFacadeDecoratorImpl.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandChain } from "../contracts/index.js";
import type { IEnterpriseComputedOutcomePreEvaluationCommandRegistry } from "../contracts/index.js";

const FACTORY_BEAN_NAME = "EnterpriseComputedOutcomeEntityAwareResolutionFacadeDecoratorFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-ENTITY-AWARE-DECORATOR-FACTORY-BEAN";

export class EnterpriseComputedOutcomeEntityAwareResolutionFacadeDecoratorFactoryBeanFactory {
  static getFactoryBeanName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FACTORY_BEAN_VERSION;
  }

  static createDecorator(
    facade: IFizzBuzzSingleValueResolutionFacade,
    commandChain: IEnterpriseComputedOutcomePreEvaluationCommandChain,
    commandRegistry: IEnterpriseComputedOutcomePreEvaluationCommandRegistry,
    entityManager: IEntityManager,
    repository: IFizzBuzzComputedOutcomeRepository,
    entityHome: IFizzBuzzComputedOutcomeEntityHome,
  ): IPreEvaluationAwareResolutionFacadeDecorator {
    const decorator = new EntityAwareComputedOutcomeResolutionFacadeDecoratorImpl(
      facade,
      commandChain,
      commandRegistry,
      entityManager,
      repository,
      entityHome,
    );
    console.debug(
      `[${FACTORY_BEAN_NAME} v${FACTORY_BEAN_VERSION}] ` +
      `Entity-aware computed outcome resolution facade decorator created: ` +
      `decorator=[${decorator.getDecoratorName()} v${decorator.getDecoratorVersion()}], ` +
      `entityManager=[${entityManager.getEntityManagerName()} v${entityManager.getEntityManagerVersion()}], ` +
      `repository=[${repository.getRepositoryName()} v${repository.getRepositoryVersion()}], ` +
      `entityHome=[${entityHome.getHomeName()} v${entityHome.getHomeVersion()}]`,
    );
    return decorator;
  }
}
