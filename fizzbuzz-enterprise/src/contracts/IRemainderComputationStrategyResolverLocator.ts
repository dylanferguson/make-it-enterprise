import type { IRemainderComputationSupervisor } from "./IRemainderComputationSupervisor.js";
import type { IRemainderOperatorDelegationService } from "./IRemainderOperatorDelegationService.js";
import type { IRemainderOperatorStrategySelector } from "./IRemainderOperatorStrategySelector.js";

export interface IRemainderComputationStrategyResolverLocator {
  resolveRemainderComputationSupervisor(): IRemainderComputationSupervisor;
  resolveRemainderOperatorDelegationService(): IRemainderOperatorDelegationService;
  resolveRemainderOperatorStrategySelector(): IRemainderOperatorStrategySelector;
  getLocatorName(): string;
  getLocatorVersion(): string;
  isLocatorInitialized(): boolean;
}
