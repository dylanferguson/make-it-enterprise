import type { ICompositeStrategyTreeNode } from "./ICompositeStrategyTreeNode.js";

export interface ICompositeStrategyTreeVisitor {
  visitLeaf(node: ICompositeStrategyTreeNode): void;
  visitBranch(node: ICompositeStrategyTreeNode): void;
  getVisitedNodeNames(): readonly string[];
  reset(): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
  getAggregatedResult(): string | null;
}
