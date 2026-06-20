import { AbstractBaseCompositeStrategyResolutionDelegate } from "../../abstracts/AbstractBaseCompositeStrategyResolutionDelegate.js";
import type { IEnterpriseFizzBuzzCompositeStrategyTree } from "../../contracts/IEnterpriseFizzBuzzCompositeStrategyTree.js";
import type { ICompositeStrategyTreeNode } from "../../contracts/ICompositeStrategyTreeNode.js";
import { FizzBuzzCompositeStrategyTreeVisitorImpl } from "./FizzBuzzCompositeStrategyTreeVisitorImpl.js";

export class CompositeStrategyResolutionDelegateImpl extends AbstractBaseCompositeStrategyResolutionDelegate {
  private static readonly DELEGATE_NAME = "CompositeStrategyResolutionDelegate";
  private static readonly DELEGATE_VERSION = "1.0.0-COMPOSITE-DELEGATE";

  constructor() {
    super(
      CompositeStrategyResolutionDelegateImpl.DELEGATE_NAME,
      CompositeStrategyResolutionDelegateImpl.DELEGATE_VERSION,
    );
  }

  override resolveWithCompositeTree(
    value: number,
    compositeTree: IEnterpriseFizzBuzzCompositeStrategyTree,
  ): string | null {
    if (!this.compositeResolutionEnabled) {
      return null;
    }
    if (!Number.isFinite(value) || value < 0) {
      return null;
    }

    const visitor = new FizzBuzzCompositeStrategyTreeVisitorImpl();
    compositeTree.accept(visitor);

    const root = compositeTree.getRoot();
    const result = root.evaluate(value);
    if (result !== null) {
      visitor.recordMatchedResult(result);
    }
    return visitor.getAggregatedResult();
  }
}
