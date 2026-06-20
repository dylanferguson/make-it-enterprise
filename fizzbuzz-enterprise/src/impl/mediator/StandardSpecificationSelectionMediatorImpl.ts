import { AbstractBaseSpecificationSelectionMediator } from "../../abstracts/AbstractBaseSpecificationSelectionMediator.js";
import type { IFizzBuzzSpecification } from "../../contracts/IFizzBuzzSpecification.js";

export class StandardSpecificationSelectionMediatorImpl extends AbstractBaseSpecificationSelectionMediator {
  private static readonly MEDIATOR_NAME = "StandardSpecificationSelectionMediator";
  private static readonly MEDIATOR_VERSION = "1.0.0-SELECTION-MEDIATOR";

  override getMediatorName(): string {
    return StandardSpecificationSelectionMediatorImpl.MEDIATOR_NAME;
  }

  override getMediatorVersion(): string {
    return StandardSpecificationSelectionMediatorImpl.MEDIATOR_VERSION;
  }

  override mediateSpecificationSelection(
    value: number,
    divisor: number,
  ): boolean {
    if (this.enforcementChain !== null) {
      return this.enforcementChain.enforce(value, divisor);
    }
    const specification = this.resolveSpecification(divisor);
    if (specification !== null) {
      return specification.isSatisfiedBy(value);
    }
    return this.defaultMediation(value, divisor);
  }

  private defaultMediation(value: number, divisor: number): boolean {
    if (divisor === 0) {
      return false;
    }
    return value % divisor === 0;
  }
}
