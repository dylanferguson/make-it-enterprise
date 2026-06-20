import { AbstractBaseCompositeStrategyTreeNode } from "../../abstracts/AbstractBaseCompositeStrategyTreeNode.js";

export class CompositeStrategyTreeBranchNodeImpl extends AbstractBaseCompositeStrategyTreeNode {
  private static readonly NODE_TYPE = "BRANCH" as const;
  private static readonly COMBINATION_STRATEGIES = ["APPEND", "FIRST_MATCH", "ALL_MATCH"] as const;

  private readonly combinationStrategy: string;

  constructor(
    nodeName: string,
    nodePriority: number = 0,
    combinationStrategy: string = "FIRST_MATCH",
  ) {
    super(nodeName, nodePriority);
    if (!CompositeStrategyTreeBranchNodeImpl.COMBINATION_STRATEGIES.includes(combinationStrategy as typeof CompositeStrategyTreeBranchNodeImpl.COMBINATION_STRATEGIES[number])) {
      throw new Error(
        `[${nodeName}] Unknown combination strategy: ${combinationStrategy}. Supported: ${CompositeStrategyTreeBranchNodeImpl.COMBINATION_STRATEGIES.join(", ")}`,
      );
    }
    this.combinationStrategy = combinationStrategy;
  }

  override evaluate(value: number): string | null {
    if (!this.canHandle(value)) {
      return null;
    }

    if (this.combinationStrategy === "APPEND") {
      const parts: string[] = [];
      for (const child of this.children) {
        const result = child.evaluate(value);
        if (result !== null) {
          parts.push(result);
        }
      }
      return parts.length > 0 ? parts.join("") : null;
    }

    if (this.combinationStrategy === "FIRST_MATCH") {
      for (const child of this.children) {
        const result = child.evaluate(value);
        if (result !== null) {
          return result;
        }
      }
      return null;
    }

    if (this.combinationStrategy === "ALL_MATCH") {
      const results: string[] = [];
      for (const child of this.children) {
        const result = child.evaluate(value);
        if (result === null) {
          return null;
        }
        results.push(result);
      }
      return results.join("");
    }

    return null;
  }

  override getNodeType(): "BRANCH" {
    return CompositeStrategyTreeBranchNodeImpl.NODE_TYPE;
  }

  override canHandle(value: number): boolean {
    return Number.isFinite(value) && value >= 0;
  }

  getCombinationStrategy(): string {
    return this.combinationStrategy;
  }
}
