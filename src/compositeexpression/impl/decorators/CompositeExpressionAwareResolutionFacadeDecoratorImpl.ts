import { AbstractBaseCompositeExpressionAwareResolutionFacadeDecorator } from "../../abstracts/AbstractBaseCompositeExpressionAwareResolutionFacadeDecorator.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { ICompositeDivisibilityExpressionInterpreter, ICompositeExpressionTreeFactory } from "../../contracts/index.js";

export class CompositeExpressionAwareResolutionFacadeDecoratorImpl
  extends AbstractBaseCompositeExpressionAwareResolutionFacadeDecorator
{
  protected readonly decoratorName = "CompositeExpressionAwareResolutionFacadeDecorator";
  protected readonly decoratorVersion = "1.0.0-CEARFD-ENTERPRISE";
  protected readonly decoratorEnabled = true;

  private compositeEvaluationCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    expressionInterpreter: ICompositeDivisibilityExpressionInterpreter,
    expressionTreeFactory: ICompositeExpressionTreeFactory,
  ) {
    super(wrappedFacade, expressionInterpreter, expressionTreeFactory);
  }

  override resolveValue(value: number): string {
    this.assertFiniteValue(value);
    this.compositeEvaluationCount++;
    const contextId = this.buildEvaluationContextId(value);
    const expressionTree = this.expressionTreeFactory.createStandardFizzBuzzExpressionTree(value);
    const outcome = this.expressionInterpreter.interpret(expressionTree);
    const outcomeResult = outcome.getCompositeResultValue();
    console.debug(
      `[${this.decoratorName} v${this.decoratorVersion}] ` +
      `Resolving value=[${value}] via composite expression interpreter decorator ` +
      `[contextId=${contextId}, expressionTree=${expressionTree.getExpressionDescriptor()}, ` +
      `outcome=${outcome.getOutcomeDescriptor()}, ` +
      `delegateResult=${outcomeResult}], ` +
      `falling back to wrapped facade for additional decoration...`,
    );
    return this.wrappedFacade.resolveValue(value);
  }

  override resolveRange(start: number, end: number): readonly string[] {
    this.assertFiniteValue(start);
    this.assertFiniteValue(end);
    if (end < start) {
      throw new Error(
        `[${this.decoratorName} v${this.decoratorVersion}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }

  override getFacadeName(): string {
    return `${this.decoratorName}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return this.decoratorVersion;
  }

  override getCompositeEvaluationCount(): number {
    return this.compositeEvaluationCount;
  }
}
