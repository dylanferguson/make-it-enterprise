import type { IDivisibilitySpecificationStrategy } from "../contracts/IDivisibilitySpecificationStrategy.js";
import type { ICompositeDivisibilitySpecificationStrategy } from "../contracts/ICompositeDivisibilitySpecificationStrategy.js";
import { AbstractBaseDivisibilitySpecificationStrategy } from "./AbstractBaseDivisibilitySpecificationStrategy.js";

export abstract class AbstractBaseCompositeDivisibilitySpecificationStrategy
  extends AbstractBaseDivisibilitySpecificationStrategy
  implements ICompositeDivisibilitySpecificationStrategy
{
  protected readonly left: IDivisibilitySpecificationStrategy;
  protected readonly right: IDivisibilitySpecificationStrategy;

  constructor(left: IDivisibilitySpecificationStrategy, right: IDivisibilitySpecificationStrategy) {
    super();
    this.left = left;
    this.right = right;
  }

  getLeftSpecification(): IDivisibilitySpecificationStrategy {
    return this.left;
  }

  getRightSpecification(): IDivisibilitySpecificationStrategy {
    return this.right;
  }

  abstract getCompositeOperatorName(): string;

  override getSpecificationDivisor(): number {
    return this.left.getSpecificationDivisor() * this.right.getSpecificationDivisor();
  }
}
