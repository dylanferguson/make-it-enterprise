import type { IEnterpriseComputationResolutionAdapterRegistry } from "./IEnterpriseComputationResolutionAdapterRegistry.js";
import type { IEnterpriseComputationResolutionAdapterVisitor } from "./IEnterpriseComputationResolutionAdapterVisitor.js";
import type { IEnterpriseComputationResolutionAdapterChainHandler } from "./IEnterpriseComputationResolutionAdapterChainHandler.js";

export interface IEnterpriseComputationResolutionMediatorArchitecture {
  resolveValue(value: number): string;
  getRegisteredAdapters(): readonly import("./IEnterpriseComputationResolutionAdapter.js").IEnterpriseComputationResolutionAdapter[];
  getRegistry(): IEnterpriseComputationResolutionAdapterRegistry;
  getVisitor(): IEnterpriseComputationResolutionAdapterVisitor;
  getChainHandler(): IEnterpriseComputationResolutionAdapterChainHandler;
  getArchitectureName(): string;
  getArchitectureVersion(): string;
  isArchitectureReady(): boolean;
}
