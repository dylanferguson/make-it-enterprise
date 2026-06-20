import { AbstractBaseEnterpriseComputationResolutionMediatorArchitecture } from "../abstracts/AbstractBaseEnterpriseComputationResolutionMediatorArchitecture.js";
import type { IEnterpriseComputationResolutionAdapterRegistry } from "../contracts/IEnterpriseComputationResolutionAdapterRegistry.js";
import type { IEnterpriseComputationResolutionAdapterVisitor } from "../contracts/IEnterpriseComputationResolutionAdapterVisitor.js";
import type { IEnterpriseComputationResolutionAdapterChainHandler } from "../contracts/IEnterpriseComputationResolutionAdapterChainHandler.js";

export class DefaultEnterpriseComputationResolutionMediatorArchitectureImpl extends AbstractBaseEnterpriseComputationResolutionMediatorArchitecture {
  private static readonly ARCHITECTURE_NAME = "DefaultEnterpriseComputationResolutionMediatorArchitectureImpl";
  private static readonly ARCHITECTURE_VERSION = "1.0.0-ARCHITECTURE";

  constructor(
    registry: IEnterpriseComputationResolutionAdapterRegistry,
    visitor: IEnterpriseComputationResolutionAdapterVisitor,
    chainHandler: IEnterpriseComputationResolutionAdapterChainHandler,
  ) {
    super(
      DefaultEnterpriseComputationResolutionMediatorArchitectureImpl.ARCHITECTURE_NAME,
      DefaultEnterpriseComputationResolutionMediatorArchitectureImpl.ARCHITECTURE_VERSION,
      registry,
      visitor,
      chainHandler,
    );
  }

  resolveValue(value: number): string {
    const adapters = this.registry.getRegisteredAdapters();
    const visitedResults = this.visitor.visitAllAdapters(adapters, value);

    const matchingAdapterResults = visitedResults.filter((r): r is string => r !== null);
    if (matchingAdapterResults.length > 0) {
      return matchingAdapterResults.join("");
    }

    const chainResult = this.chainHandler.handleResolution(value, adapters);
    if (chainResult !== null) {
      return chainResult;
    }

    this.architectureReady = true;
    return String(value);
  }
}
