import { AbstractBaseCompositeStrategyTreeBuilder } from "../../abstracts/AbstractBaseCompositeStrategyTreeBuilder.js";
import type { ICompositeStrategyTreeNode } from "../../contracts/ICompositeStrategyTreeNode.js";
import { CompositeStrategyTreeLeafNodeImpl } from "./CompositeStrategyTreeLeafNodeImpl.js";
import { CompositeStrategyTreeBranchNodeImpl } from "./CompositeStrategyTreeBranchNodeImpl.js";

export class CompositeStrategyTreeBuilderImpl extends AbstractBaseCompositeStrategyTreeBuilder {
  private static readonly BUILDER_NAME = "CompositeStrategyTreeBuilder";
  private static readonly BUILDER_VERSION = "1.0.0-COMPOSITE-BUILDER";

  private rootNode: ICompositeStrategyTreeNode | null;
  private nodeRegistry: Map<string, ICompositeStrategyTreeNode>;

  constructor() {
    super(
      CompositeStrategyTreeBuilderImpl.BUILDER_NAME,
      CompositeStrategyTreeBuilderImpl.BUILDER_VERSION,
    );
    this.rootNode = null;
    this.nodeRegistry = new Map();
  }

  override reset(): this {
    this.rootNode = null;
    this.nodeRegistry.clear();
    return this;
  }

  override withRootNode(node: ICompositeStrategyTreeNode): this {
    this.rootNode = node;
    this.nodeRegistry.set(node.getNodeName(), node);
    return this;
  }

  override withBranchNode(name: string, priority: number = 0): this {
    const existing = this.nodeRegistry.get(name);
    if (existing !== undefined) {
      if (existing.getNodeType() === "BRANCH") {
        return this;
      }
      throw new Error(`Node already exists with different type: ${name}`);
    }
    const branch = new CompositeStrategyTreeBranchNodeImpl(name, priority);
    this.nodeRegistry.set(name, branch);
    if (this.rootNode === null) {
      this.rootNode = branch;
    }
    return this;
  }

  override withLeafNode(
    name: string,
    divisor: number,
    label: string,
    priority: number = 0,
  ): this {
    const existing = this.nodeRegistry.get(name);
    if (existing !== undefined) {
      if (
        existing.getNodeType() === "LEAF" &&
        existing instanceof CompositeStrategyTreeLeafNodeImpl
      ) {
        return this;
      }
      throw new Error(`Node already exists with different type: ${name}`);
    }
    const leaf = new CompositeStrategyTreeLeafNodeImpl(
      name,
      divisor,
      label,
      priority,
    );
    this.nodeRegistry.set(name, leaf);
    if (this.rootNode === null) {
      this.rootNode = leaf;
    }
    return this;
  }

  override attachChildTo(parentName: string, child: ICompositeStrategyTreeNode): this {
    const parent = this.nodeRegistry.get(parentName);
    if (parent === undefined) {
      throw new Error(
        `Parent node not found: ${parentName}. Available: ${Array.from(this.nodeRegistry.keys()).join(", ")}`,
      );
    }
    if (parent.getNodeType() !== "BRANCH") {
      throw new Error(
        `Cannot attach child to leaf node: ${parentName}`,
      );
    }
    parent.addChild(child);
    if (!this.nodeRegistry.has(child.getNodeName())) {
      this.nodeRegistry.set(child.getNodeName(), child);
    }
    return this;
  }

  override build(): ICompositeStrategyTreeNode {
    if (this.rootNode === null) {
      throw new Error(
        "Cannot build composite tree: no root node configured. Call withRootNode, withBranchNode, or withLeafNode first.",
      );
    }
    return this.rootNode;
  }
}
