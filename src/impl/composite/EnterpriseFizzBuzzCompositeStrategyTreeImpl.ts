import type { IEnterpriseFizzBuzzCompositeStrategyTree } from "../../contracts/IEnterpriseFizzBuzzCompositeStrategyTree.js";
import type { ICompositeStrategyTreeNode } from "../../contracts/ICompositeStrategyTreeNode.js";
import type { ICompositeStrategyTreeVisitor } from "../../contracts/ICompositeStrategyTreeVisitor.js";
import type { ICompositeStrategyResolutionDelegate } from "../../contracts/ICompositeStrategyResolutionDelegate.js";
import { AbstractBaseCompositeStrategyTreeNode } from "../../abstracts/AbstractBaseCompositeStrategyTreeNode.js";

export class EnterpriseFizzBuzzCompositeStrategyTreeImpl implements IEnterpriseFizzBuzzCompositeStrategyTree {
  private static readonly TREE_NAME = "EnterpriseFizzBuzzCompositeStrategyTree";
  private static readonly TREE_VERSION = "1.0.0-COMPOSITE-TREE";

  private readonly root: ICompositeStrategyTreeNode;
  private readonly resolutionDelegate: ICompositeStrategyResolutionDelegate;

  constructor(
    root: ICompositeStrategyTreeNode,
    resolutionDelegate: ICompositeStrategyResolutionDelegate,
  ) {
    this.root = root;
    this.resolutionDelegate = resolutionDelegate;
  }

  evaluate(value: number): string | null {
    return this.resolutionDelegate.resolveWithCompositeTree(value, this);
  }

  getRoot(): ICompositeStrategyTreeNode {
    return this.root;
  }

  getTreeName(): string {
    return EnterpriseFizzBuzzCompositeStrategyTreeImpl.TREE_NAME;
  }

  getTreeVersion(): string {
    return EnterpriseFizzBuzzCompositeStrategyTreeImpl.TREE_VERSION;
  }

  accept(visitor: ICompositeStrategyTreeVisitor): void {
    this.root.accept(visitor);
  }

  getResolutionDelegate(): ICompositeStrategyResolutionDelegate {
    return this.resolutionDelegate;
  }
}
