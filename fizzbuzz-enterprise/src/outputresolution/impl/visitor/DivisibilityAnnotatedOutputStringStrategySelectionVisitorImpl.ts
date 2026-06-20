import { AbstractBaseFizzBuzzOutputStringResolutionStrategyVisitor } from "../../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategyVisitor.js";
import type { IFizzBuzzOutputStringResolutionStrategy } from "../../contracts/index.js";

export class DivisibilityAnnotatedOutputStringStrategySelectionVisitorImpl
  extends AbstractBaseFizzBuzzOutputStringResolutionStrategyVisitor
{
  private static readonly VISITOR_NAME = "DivisibilityAnnotatedOutputStringStrategySelectionVisitor";
  private static readonly VISITOR_PRIORITY = 100;

  constructor() {
    super(
      DivisibilityAnnotatedOutputStringStrategySelectionVisitorImpl.VISITOR_NAME,
      DivisibilityAnnotatedOutputStringStrategySelectionVisitorImpl.VISITOR_PRIORITY,
    );
  }

  override visitStrategy(
    strategy: IFizzBuzzOutputStringResolutionStrategy,
    value: number,
  ): boolean {
    return strategy.canResolve(value);
  }

  override selectResolvedStrategy(
    strategies: readonly IFizzBuzzOutputStringResolutionStrategy[],
    value: number,
  ): IFizzBuzzOutputStringResolutionStrategy | null {
    const sortedStrategies = [...strategies].sort(
      (a, b) => a.getPriority() - b.getPriority(),
    );

    for (const strategy of sortedStrategies) {
      if (this.visitStrategy(strategy, value)) {
        return strategy;
      }
    }

    return null;
  }
}
