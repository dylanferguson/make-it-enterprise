import { AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl } from "../abstracts/AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl.js";

export class DefaultEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl
  extends AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl
{
  private static readonly REGISTRY_NAME = "DefaultEnterpriseFizzBuzzResultValidationSpecificationRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-VALIDATION-REGISTRY";

  constructor() {
    super(
      DefaultEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl.REGISTRY_NAME,
      DefaultEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl.REGISTRY_VERSION,
      true,
    );
  }
}
