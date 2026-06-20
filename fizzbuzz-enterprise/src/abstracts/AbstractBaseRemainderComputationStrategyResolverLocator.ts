import type { IRemainderComputationSupervisor } from "../contracts/IRemainderComputationSupervisor.js";
import type { IRemainderOperatorDelegationService } from "../contracts/IRemainderOperatorDelegationService.js";
import type { IRemainderOperatorStrategySelector } from "../contracts/IRemainderOperatorStrategySelector.js";
import type { IRemainderComputationStrategyResolverLocator } from "../contracts/IRemainderComputationStrategyResolverLocator.js";

export abstract class AbstractBaseRemainderComputationStrategyResolverLocator
  implements IRemainderComputationStrategyResolverLocator
{
  private initialized = false;
  private supervisor: IRemainderComputationSupervisor | null = null;
  private delegationService: IRemainderOperatorDelegationService | null = null;
  private strategySelector: IRemainderOperatorStrategySelector | null = null;

  abstract getLocatorName(): string;
  abstract getLocatorVersion(): string;

  abstract doInitialize(): {
    supervisor: IRemainderComputationSupervisor;
    delegationService: IRemainderOperatorDelegationService;
    strategySelector: IRemainderOperatorStrategySelector;
  };

  resolveRemainderComputationSupervisor(): IRemainderComputationSupervisor {
    this.ensureLocatorInitialized();
    return this.supervisor!;
  }

  resolveRemainderOperatorDelegationService(): IRemainderOperatorDelegationService {
    this.ensureLocatorInitialized();
    return this.delegationService!;
  }

  resolveRemainderOperatorStrategySelector(): IRemainderOperatorStrategySelector {
    this.ensureLocatorInitialized();
    return this.strategySelector!;
  }

  isLocatorInitialized(): boolean {
    return this.initialized;
  }

  protected ensureLocatorInitialized(): void {
    if (!this.initialized) {
      const components = this.doInitialize();
      this.supervisor = components.supervisor;
      this.delegationService = components.delegationService;
      this.strategySelector = components.strategySelector;
      this.initialized = true;
    }
  }

  protected getTemplateMethodLocatorName(): string {
    return `${this.getLocatorName()} v${this.getLocatorVersion()}`;
  }
}
