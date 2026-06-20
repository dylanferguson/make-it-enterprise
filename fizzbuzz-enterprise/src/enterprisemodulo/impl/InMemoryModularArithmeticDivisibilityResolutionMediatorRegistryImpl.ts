import { AbstractBaseModularArithmeticDivisibilityResolutionMediatorRegistry } from "../abstracts/AbstractBaseModularArithmeticDivisibilityResolutionMediatorRegistry.js";

export class InMemoryModularArithmeticDivisibilityResolutionMediatorRegistryImpl
  extends AbstractBaseModularArithmeticDivisibilityResolutionMediatorRegistry
{
  private static readonly REGISTRY_NAME = "InMemoryModularArithmeticDivisibilityResolutionMediatorRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-IN-MEMORY-REGISTRY";

  constructor() {
    super(
      InMemoryModularArithmeticDivisibilityResolutionMediatorRegistryImpl.REGISTRY_NAME,
      InMemoryModularArithmeticDivisibilityResolutionMediatorRegistryImpl.REGISTRY_VERSION,
    );
  }
}
