import type { IDivisibilitySpecificationStrategy } from "./IDivisibilitySpecificationStrategy.js";

export interface ICompositeDivisibilitySpecificationStrategy extends IDivisibilitySpecificationStrategy {
  getLeftSpecification(): IDivisibilitySpecificationStrategy;
  getRightSpecification(): IDivisibilitySpecificationStrategy;
  getCompositeOperatorName(): string;
}
