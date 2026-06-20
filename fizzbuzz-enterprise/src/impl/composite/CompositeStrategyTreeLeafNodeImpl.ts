import { AbstractBaseCompositeStrategyTreeNode } from "../../abstracts/AbstractBaseCompositeStrategyTreeNode.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export class CompositeStrategyTreeLeafNodeImpl extends AbstractBaseCompositeStrategyTreeNode {
  private static readonly NODE_TYPE = "LEAF" as const;

  private readonly targetDivisor: number;
  private readonly outputLabel: string;
  private readonly divisibilityFacade: IEnterpriseDivisibilityResolutionFacade;

  constructor(
    nodeName: string,
    targetDivisor: number,
    outputLabel: string,
    nodePriority: number = 0,
    divisibilityFacade?: IEnterpriseDivisibilityResolutionFacade,
  ) {
    super(nodeName, nodePriority);
    this.targetDivisor = targetDivisor;
    this.outputLabel = outputLabel;
    this.divisibilityFacade = divisibilityFacade ?? CompositeStrategyTreeLeafNodeImpl.resolveDefaultDivisibilityFacade();
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
    return Number.isFinite(value) && value >= 0 && this.divisibilityFacade.isDivisible(value, this.targetDivisor);
  }

  getTargetDivisor(): number {
    return this.targetDivisor;
  }

  getOutputLabel(): string {
    return this.outputLabel;
  }

  getDivisibilityFacade(): IEnterpriseDivisibilityResolutionFacade {
    return this.divisibilityFacade;
  }

  private static resolveDefaultDivisibilityFacade(): IEnterpriseDivisibilityResolutionFacade {
    const { EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory } = require("../factories/EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.js");
    return EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.createDivisibilityResolutionFacade();
  }
}
