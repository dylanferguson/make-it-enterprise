import type { ICompositeStrategyTreeNode } from "../contracts/ICompositeStrategyTreeNode.js";
import type { ICompositeStrategyTreeVisitor } from "../contracts/ICompositeStrategyTreeVisitor.js";

export abstract class AbstractBaseCompositeStrategyTreeNode implements ICompositeStrategyTreeNode {
  protected readonly nodeName: string;
  protected readonly nodePriority: number;
  protected readonly children: ICompositeStrategyTreeNode[];

  constructor(nodeName: string, nodePriority: number = 0) {
    this.nodeName = nodeName;
    this.nodePriority = nodePriority;
    this.children = [];
  }

  abstract evaluate(value: number): string | null;
  abstract getNodeType(): "LEAF" | "BRANCH";
  abstract canHandle(value: number): boolean;

  accept(visitor: ICompositeStrategyTreeVisitor): void {
    if (this.getNodeType() === "LEAF") {
      visitor.visitLeaf(this);
    } else {
      visitor.visitBranch(this);
    }
    for (const child of this.children) {
      child.accept(visitor);
    }
  }

  getNodeName(): string {
    return this.nodeName;
  }

  getNodePriority(): number {
    return this.nodePriority;
  }

  getChildCount(): number {
    return this.children.length;
  }

  getChildren(): readonly ICompositeStrategyTreeNode[] {
    return [...this.children];
  }

  addChild(node: ICompositeStrategyTreeNode): void {
    this.children.push(node);
    this.children.sort((a, b) => b.getNodePriority() - a.getNodePriority());
  }

  removeChild(nodeName: string): boolean {
    const index = this.children.findIndex((c) => c.getNodeName() === nodeName);
    if (index === -1) return false;
    this.children.splice(index, 1);
    return true;
  }
}
