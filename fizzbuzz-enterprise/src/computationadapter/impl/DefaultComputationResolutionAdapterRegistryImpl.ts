import { AbstractBaseEnterpriseComputationResolutionAdapterRegistry } from "../abstracts/AbstractBaseEnterpriseComputationResolutionAdapterRegistry.js";

export class DefaultComputationResolutionAdapterRegistryImpl extends AbstractBaseEnterpriseComputationResolutionAdapterRegistry {
  private static readonly DEFAULT_REGISTRY_NAME = "DefaultComputationResolutionAdapterRegistryImpl";
  private static readonly DEFAULT_REGISTRY_VERSION = "1.0.0-REGISTRY";

  constructor() {
    super(
      DefaultComputationResolutionAdapterRegistryImpl.DEFAULT_REGISTRY_NAME,
      DefaultComputationResolutionAdapterRegistryImpl.DEFAULT_REGISTRY_VERSION,
    );
  }

  clearRegistry(): void {
    this.adapters.clear();
  }
}
