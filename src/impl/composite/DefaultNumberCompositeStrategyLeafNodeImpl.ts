import { AbstractBaseCompositeStrategyTreeNode } from "../../abstracts/AbstractBaseCompositeStrategyTreeNode.js";

export class DefaultNumberCompositeStrategyLeafNodeImpl extends AbstractBaseCompositeStrategyTreeNode {
  private static readonly NODE_TYPE = "LEAF" as const;

  constructor(nodeName: string = "DefaultNumberLeaf", nodePriority: number = -100) {
    super(nodeName, nodePriority);
  }

  override evaluate(value: number): string | null {
    if (!this.canHandle(value)) {
      return null;
    }
    return value.toString();
  }

  override getNodeType(): "LEAF" {
    return DefaultNumberCompositeStrategyLeafNodeImpl.NODE_TYPE;
  }

  override canHandle(value: number): boolean {
    return Number.isFinite(value) && value >= 0;
  }
}
