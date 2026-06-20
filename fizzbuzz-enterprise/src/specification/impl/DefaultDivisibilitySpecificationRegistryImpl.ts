import type { IDivisibilitySpecificationStrategy } from "../contracts/IDivisibilitySpecificationStrategy.js";
import type { IDivisibilitySpecificationRegistry } from "../contracts/IDivisibilitySpecificationRegistry.js";
import { AbstractBaseDivisibilitySpecificationRegistry } from "../abstracts/AbstractBaseDivisibilitySpecificationRegistry.js";

export class DefaultDivisibilitySpecificationRegistryImpl
  extends AbstractBaseDivisibilitySpecificationRegistry
{
  private static readonly REGISTRY_NAME = "DefaultDivisibilitySpecificationRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-SPECIFICATION-REGISTRY";
  override getRegistryName(): string {
    return DefaultDivisibilitySpecificationRegistryImpl.REGISTRY_NAME;
  }

  override getRegistryVersion(): string {
    return DefaultDivisibilitySpecificationRegistryImpl.REGISTRY_VERSION;
  }
}
