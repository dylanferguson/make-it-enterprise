import { EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory } from "./EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory.js";

export class EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DELEGATION-ORCHESTRATOR-FACTORY-BEAN-FACTORY-FACTORY";

  private static innerFactoryFactorySingleton: typeof EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory | null = null;

  static createFactoryFactory(): typeof EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory {
    if (EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.innerFactoryFactorySingleton === null) {
      EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.innerFactoryFactorySingleton =
        EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory;
    }
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.innerFactoryFactorySingleton;
  }

  static getFactoryFactoryName(): string {
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryFactoryVersion(): string {
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory.FACTORY_BEAN_VERSION;
  }
}
