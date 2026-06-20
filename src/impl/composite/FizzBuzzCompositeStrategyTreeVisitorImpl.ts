import { AbstractBaseCompositeStrategyTreeVisitor } from "../../abstracts/AbstractBaseCompositeStrategyTreeVisitor.js";
import type { ICompositeStrategyTreeNode } from "../../contracts/ICompositeStrategyTreeNode.js";

export class FizzBuzzCompositeStrategyTreeVisitorImpl extends AbstractBaseCompositeStrategyTreeVisitor {
  private static readonly VISITOR_NAME = "FizzBuzzCompositeStrategyTreeVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-COMPOSITE-VISITOR";

  private readonly matchedResults: string[];

  constructor() {
    super(
      FizzBuzzCompositeStrategyTreeVisitorImpl.VISITOR_NAME,
      FizzBuzzCompositeStrategyTreeVisitorImpl.VISITOR_VERSION,
    );
    this.matchedResults = [];
  }

  override visitLeaf(node: ICompositeStrategyTreeNode): void {
    this.recordVisit(node);
  }

  override visitBranch(node: ICompositeStrategyTreeNode): void {
    this.recordVisit(node);
  }

  override getAggregatedResult(): string | null {
    if (this.matchedResults.length === 0) {
      return null;
    }
    return this.matchedResults.join("");
  }

  override reset(): void {
    super.reset();
    this.matchedResults.length = 0;
  }

  recordMatchedResult(result: string): void {
    this.matchedResults.push(result);
  }
}
