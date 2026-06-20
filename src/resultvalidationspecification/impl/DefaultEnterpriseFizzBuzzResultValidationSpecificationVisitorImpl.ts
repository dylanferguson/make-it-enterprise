import { AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationVisitorImpl } from "../abstracts/AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationVisitorImpl.js";
import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";

export class DefaultEnterpriseFizzBuzzResultValidationSpecificationVisitorImpl
  extends AbstractBaseEnterpriseFizzBuzzResultValidationSpecificationVisitorImpl
{
  private static readonly VISITOR_NAME = "DefaultEnterpriseFizzBuzzResultValidationSpecificationVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-VALIDATION-VISITOR";

  constructor() {
    super(
      DefaultEnterpriseFizzBuzzResultValidationSpecificationVisitorImpl.VISITOR_NAME,
      DefaultEnterpriseFizzBuzzResultValidationSpecificationVisitorImpl.VISITOR_VERSION,
    );
  }

  override visitRegistry(registry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry): void {
    const specs = registry.resolveSpecificationsByPriority();
    for (const spec of specs) {
      this.visitSpecification(spec);
    }
  }
}
