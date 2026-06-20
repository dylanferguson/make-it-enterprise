import type { IDivisibilitySpecificationStrategy } from "../contracts/IDivisibilitySpecificationStrategy.js";

export interface ICompositeDivisibilitySpecificationStrategy extends IDivisibilitySpecificationStrategy {
  getLeftSpecification(): IDivisibilitySpecificationStrategy;
  getRightSpecification(): IDivisibilitySpecificationStrategy;
  getCompositeOperatorName(): string;
}
