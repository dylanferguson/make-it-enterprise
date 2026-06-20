import type { ICompositeStrategyResolutionDelegate } from "./ICompositeStrategyResolutionDelegate.js";
import type { ICompositeStrategyTreeNode } from "./ICompositeStrategyTreeNode.js";
import type { ICompositeStrategyTreeVisitor } from "./ICompositeStrategyTreeVisitor.js";

export interface IEnterpriseFizzBuzzCompositeStrategyTree {
  evaluate(value: number): string | null;
  getRoot(): ICompositeStrategyTreeNode;
  getTreeName(): string;
  getTreeVersion(): string;
  accept(visitor: ICompositeStrategyTreeVisitor): void;
  getResolutionDelegate(): ICompositeStrategyResolutionDelegate;
}
