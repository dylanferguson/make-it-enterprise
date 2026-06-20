import type { ICompositeStrategyTreeNode } from "./ICompositeStrategyTreeNode.js";

export interface ICompositeStrategyTreeBuilder {
  reset(): ICompositeStrategyTreeBuilder;
  withRootNode(node: ICompositeStrategyTreeNode): ICompositeStrategyTreeBuilder;
  withBranchNode(name: string, priority: number): ICompositeStrategyTreeBuilder;
  withLeafNode(name: string, divisor: number, label: string, priority: number): ICompositeStrategyTreeBuilder;
  attachChildTo(parentName: string, child: ICompositeStrategyTreeNode): ICompositeStrategyTreeBuilder;
  build(): ICompositeStrategyTreeNode;
  getBuilderName(): string;
  getBuilderVersion(): string;
}
