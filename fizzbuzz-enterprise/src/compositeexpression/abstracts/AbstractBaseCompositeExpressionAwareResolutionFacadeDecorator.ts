import type { ICompositeExpressionAwareResolutionFacadeDecorator } from "../contracts/ICompositeExpressionAwareResolutionFacadeDecorator.js";
import type { ICompositeDivisibilityExpressionInterpreter, ICompositeExpressionTreeFactory } from "../contracts/index.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export abstract class AbstractBaseCompositeExpressionAwareResolutionFacadeDecorator
  implements ICompositeExpressionAwareResolutionFacadeDecorator
{
  protected abstract readonly decoratorName: string;
  protected abstract readonly decoratorVersion: string;
  protected abstract readonly decoratorEnabled: boolean;

  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly expressionInterpreter: ICompositeDivisibilityExpressionInterpreter;
  protected readonly expressionTreeFactory: ICompositeExpressionTreeFactory;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    expressionInterpreter: ICompositeDivisibilityExpressionInterpreter,
    expressionTreeFactory: ICompositeExpressionTreeFactory,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.expressionInterpreter = expressionInterpreter;
    this.expressionTreeFactory = expressionTreeFactory;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;

  getDecoratorName(): string {
    return this.decoratorName;
  }

  getDecoratorVersion(): string {
    return this.decoratorVersion;
  }

  isDecoratorEnabled(): boolean {
    return this.decoratorEnabled;
  }

  getWrappedFacadeName(): string {
    return this.wrappedFacade.getFacadeName();
  }

  getExpressionInterpreter(): ICompositeDivisibilityExpressionInterpreter {
    return this.expressionInterpreter;
  }

  getExpressionTreeFactory(): ICompositeExpressionTreeFactory {
    return this.expressionTreeFactory;
  }

  abstract getCompositeEvaluationCount(): number;

  protected buildEvaluationContextId(value: number): string {
    return `composite:expr:dec:${value}:${Date.now()}`;
  }

  protected assertFiniteValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.decoratorName} v${this.decoratorVersion}] ` +
        `Resolution value must be finite, received: ${value}`,
      );
    }
  }
}
