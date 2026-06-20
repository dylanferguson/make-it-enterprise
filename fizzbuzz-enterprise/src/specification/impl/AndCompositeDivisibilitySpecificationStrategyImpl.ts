import type { IDivisibilitySpecificationStrategy } from "../contracts/IDivisibilitySpecificationStrategy.js";
import { AbstractBaseCompositeDivisibilitySpecificationStrategy } from "../abstracts/AbstractBaseCompositeDivisibilitySpecificationStrategy.js";

export class AndCompositeDivisibilitySpecificationStrategyImpl
  extends AbstractBaseCompositeDivisibilitySpecificationStrategy
{
  private static readonly COMPOSITE_OPERATOR = "AND";
  private static readonly SPECIFICATION_VERSION = "1.0.0-AND-COMPOSITE-SPECIFICATION";

  constructor(left: IDivisibilitySpecificationStrategy, right: IDivisibilitySpecificationStrategy) {
    super(left, right);
  }

  override isSatisfiedBy(value: number): boolean {
    return this.left.isSatisfiedBy(value) && this.right.isSatisfiedBy(value);
  }

  override getSpecificationName(): string {
    return `AndComposite(${this.left.getSpecificationName()},${this.right.getSpecificationName()})`;
  }

  override getSpecificationVersion(): string {
    return AndCompositeDivisibilitySpecificationStrategyImpl.SPECIFICATION_VERSION;
  }

  override getCompositeOperatorName(): string {
    return AndCompositeDivisibilitySpecificationStrategyImpl.COMPOSITE_OPERATOR;
  }
}
