import type { IEnterpriseFizzBuzzResolutionDelegationOrchestrator } from "../contracts/IEnterpriseFizzBuzzResolutionDelegationOrchestrator.js";
import type { IResolutionDelegationVisitor } from "../visitors/contracts/IResolutionDelegationVisitor.js";
import { DelegatingEnterpriseFizzBuzzResolutionDelegationOrchestratorImpl } from "../impl/DelegatingEnterpriseFizzBuzzResolutionDelegationOrchestratorImpl.js";

export class EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DELEGATION-ORCHESTRATOR-FACTORY-BEAN";

  private static orchestratorSingleton: IEnterpriseFizzBuzzResolutionDelegationOrchestrator | null = null;

  static createOrchestrator(
    visitors?: IResolutionDelegationVisitor[],
  ): IEnterpriseFizzBuzzResolutionDelegationOrchestrator {
    if (EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.orchestratorSingleton === null) {
      EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.orchestratorSingleton =
        new DelegatingEnterpriseFizzBuzzResolutionDelegationOrchestratorImpl(visitors);
    }
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.orchestratorSingleton;
  }

  static getOrchestrator(): IEnterpriseFizzBuzzResolutionDelegationOrchestrator | null {
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.orchestratorSingleton;
  }

  static initializeOrchestrator(visitors?: IResolutionDelegationVisitor[]): void {
    EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.createOrchestrator(visitors);
  }

  static isOrchestratorInitialized(): boolean {
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.orchestratorSingleton !== null &&
      EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.orchestratorSingleton.isOrchestratorInitialized();
  }

  static resetOrchestrator(): void {
    EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.orchestratorSingleton = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
