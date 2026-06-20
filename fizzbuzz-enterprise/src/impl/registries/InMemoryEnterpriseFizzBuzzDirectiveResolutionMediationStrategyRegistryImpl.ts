import { AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry.js";

export class InMemoryEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistryImpl
  extends AbstractBaseEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry
{
  private static readonly REGISTRY_NAME = "InMemoryEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-IN-MEMORY-REGISTRY";

  getRegistryName(): string {
    return InMemoryEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return InMemoryEnterpriseFizzBuzzDirectiveResolutionMediationStrategyRegistryImpl.REGISTRY_VERSION;
  }
}
