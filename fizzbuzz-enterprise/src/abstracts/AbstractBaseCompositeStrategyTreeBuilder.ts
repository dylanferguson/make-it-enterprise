import type { ICompositeStrategyTreeBuilder } from "../contracts/ICompositeStrategyTreeBuilder.js";
import type { ICompositeStrategyTreeNode } from "../contracts/ICompositeStrategyTreeNode.js";

export abstract class AbstractBaseCompositeStrategyTreeBuilder implements ICompositeStrategyTreeBuilder {
  protected readonly builderName: string;
  protected readonly builderVersion: string;

  constructor(builderName: string, builderVersion: string) {
    this.builderName = builderName;
    this.builderVersion = builderVersion;
  }

  abstract reset(): ICompositeStrategyTreeBuilder;
  abstract withRootNode(node: ICompositeStrategyTreeNode): ICompositeStrategyTreeBuilder;
  abstract withBranchNode(name: string, priority: number): ICompositeStrategyTreeBuilder;
  abstract withLeafNode(name: string, divisor: number, label: string, priority: number): ICompositeStrategyTreeBuilder;
  abstract attachChildTo(parentName: string, child: ICompositeStrategyTreeNode): ICompositeStrategyTreeBuilder;
  abstract build(): ICompositeStrategyTreeNode;

  getBuilderName(): string {
    return this.builderName;
  }

  getBuilderVersion(): string {
    return this.builderVersion;
  }
}
