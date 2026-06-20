import type { IEnterpriseFizzBuzzResolutionDelegationOrchestrator } from "../contracts/IEnterpriseFizzBuzzResolutionDelegationOrchestrator.js";
import type { IResolutionDelegationVisitor } from "../visitors/contracts/IResolutionDelegationVisitor.js";
import { EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory } from "./EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.js";

export class EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DELEGATION-ORCHESTRATOR-FACTORY-BEAN-FACTORY";

  private static innerFactorySingleton: typeof EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory | null = null;

  static createFactory(): typeof EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory {
    if (EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory.innerFactorySingleton === null) {
      EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory.innerFactorySingleton =
        EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory;
    }
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory.innerFactorySingleton;
  }

  static getOrCreateOrchestrator(
    visitors?: IResolutionDelegationVisitor[],
  ): IEnterpriseFizzBuzzResolutionDelegationOrchestrator {
    const factory = EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory.createFactory();
    if (!factory.isOrchestratorInitialized()) {
      return factory.createOrchestrator(visitors);
    }
    return factory.getOrchestrator()!;
  }

  static getFactoryName(): string {
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryVersion(): string {
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactory.FACTORY_BEAN_VERSION;
  }
}
