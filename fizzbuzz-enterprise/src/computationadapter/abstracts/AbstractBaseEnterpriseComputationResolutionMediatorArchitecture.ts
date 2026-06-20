import type { IEnterpriseComputationResolutionAdapterRegistry } from "../contracts/IEnterpriseComputationResolutionAdapterRegistry.js";
import type { IEnterpriseComputationResolutionAdapterVisitor } from "../contracts/IEnterpriseComputationResolutionAdapterVisitor.js";
import type { IEnterpriseComputationResolutionAdapterChainHandler } from "../contracts/IEnterpriseComputationResolutionAdapterChainHandler.js";
import type { IEnterpriseComputationResolutionMediatorArchitecture } from "../contracts/IEnterpriseComputationResolutionMediatorArchitecture.js";
import type { IEnterpriseComputationResolutionAdapter } from "../contracts/IEnterpriseComputationResolutionAdapter.js";

export abstract class AbstractBaseEnterpriseComputationResolutionMediatorArchitecture
  implements IEnterpriseComputationResolutionMediatorArchitecture
{
  protected readonly architectureName: string;
  protected readonly architectureVersion: string;
  protected readonly registry: IEnterpriseComputationResolutionAdapterRegistry;
  protected readonly visitor: IEnterpriseComputationResolutionAdapterVisitor;
  protected readonly chainHandler: IEnterpriseComputationResolutionAdapterChainHandler;
  protected architectureReady: boolean;

  constructor(
    architectureName: string,
    architectureVersion: string,
    registry: IEnterpriseComputationResolutionAdapterRegistry,
    visitor: IEnterpriseComputationResolutionAdapterVisitor,
    chainHandler: IEnterpriseComputationResolutionAdapterChainHandler,
  ) {
    this.architectureName = architectureName;
    this.architectureVersion = architectureVersion;
    this.registry = registry;
    this.visitor = visitor;
    this.chainHandler = chainHandler;
    this.architectureReady = false;
  }

  abstract resolveValue(value: number): string;

  getRegisteredAdapters(): readonly IEnterpriseComputationResolutionAdapter[] {
    return this.registry.getRegisteredAdapters();
  }

  getRegistry(): IEnterpriseComputationResolutionAdapterRegistry {
    return this.registry;
  }

  getVisitor(): IEnterpriseComputationResolutionAdapterVisitor {
    return this.visitor;
  }

  getChainHandler(): IEnterpriseComputationResolutionAdapterChainHandler {
    return this.chainHandler;
  }

  getArchitectureName(): string {
    return this.architectureName;
  }

  getArchitectureVersion(): string {
    return this.architectureVersion;
  }

  isArchitectureReady(): boolean {
    return this.architectureReady;
  }
}
