import type { ICompositeStrategyTreeVisitor } from "../contracts/ICompositeStrategyTreeVisitor.js";
import type { ICompositeStrategyTreeNode } from "../contracts/ICompositeStrategyTreeNode.js";

export abstract class AbstractBaseCompositeStrategyTreeVisitor implements ICompositeStrategyTreeVisitor {
  protected readonly visitorName: string;
  protected readonly visitorVersion: string;
  protected readonly visitedNodeNames: string[];

  constructor(visitorName: string, visitorVersion: string) {
    this.visitorName = visitorName;
    this.visitorVersion = visitorVersion;
    this.visitedNodeNames = [];
  }

  abstract visitLeaf(node: ICompositeStrategyTreeNode): void;
  abstract visitBranch(node: ICompositeStrategyTreeNode): void;
  abstract getAggregatedResult(): string | null;

  getVisitedNodeNames(): readonly string[] {
    return [...this.visitedNodeNames];
  }

  reset(): void {
    this.visitedNodeNames.length = 0;
  }

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }

  protected recordVisit(node: ICompositeStrategyTreeNode): void {
    this.visitedNodeNames.push(node.getNodeName());
  }
}
