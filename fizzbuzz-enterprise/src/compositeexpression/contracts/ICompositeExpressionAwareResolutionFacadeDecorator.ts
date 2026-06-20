import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { ICompositeDivisibilityExpressionInterpreter } from "./index.js";
import type { ICompositeExpressionTreeFactory } from "./index.js";

export interface ICompositeExpressionAwareResolutionFacadeDecorator extends IFizzBuzzSingleValueResolutionFacade {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isDecoratorEnabled(): boolean;
  getWrappedFacadeName(): string;
  getExpressionInterpreter(): ICompositeDivisibilityExpressionInterpreter;
  getExpressionTreeFactory(): ICompositeExpressionTreeFactory;
  getCompositeEvaluationCount(): number;
}
