import { AbstractBaseCompositeStrategyTreeNode } from "../../abstracts/AbstractBaseCompositeStrategyTreeNode.js";

export class CompositeStrategyTreeLeafNodeImpl extends AbstractBaseCompositeStrategyTreeNode {
  private static readonly NODE_TYPE = "LEAF" as const;

  private readonly targetDivisor: number;
  private readonly outputLabel: string;

  constructor(
    nodeName: string,
    targetDivisor: number,
    outputLabel: string,
    nodePriority: number = 0,
  ) {
    super(nodeName, nodePriority);
    this.targetDivisor = targetDivisor;
    this.outputLabel = outputLabel;
  }

  override evaluate(value: number): string | null {
    if (!this.canHandle(value)) {
      return null;
    }
    return this.outputLabel;
  }

  override getNodeType(): "LEAF" {
    return CompositeStrategyTreeLeafNodeImpl.NODE_TYPE;
  }

  override canHandle(value: number): boolean {
    return Number.isFinite(value) && value >= 0 && value % this.targetDivisor === 0;
  }

  getTargetDivisor(): number {
    return this.targetDivisor;
  }

  getOutputLabel(): string {
    return this.outputLabel;
  }
}
