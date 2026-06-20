import { AbstractBaseEnterpriseClassificationVisitor } from "../../abstracts/AbstractBaseEnterpriseClassificationVisitor.js";
import type { IEnterpriseClassificationChainHandler } from "../../contracts/index.js";
import type { IEnterpriseClassificationRegistry } from "../../contracts/index.js";

export class StandardEnterpriseClassificationVisitorImpl
  extends AbstractBaseEnterpriseClassificationVisitor
{
  protected readonly visitorName = "StandardEnterpriseClassificationVisitor";
  protected readonly visitorVersion = "1.0.0-ECV-STANDARD";

  private readonly registry: IEnterpriseClassificationRegistry;

  constructor(registry: IEnterpriseClassificationRegistry) {
    super();
    this.registry = registry;
  }

  override visitValue(value: number): string | null {
    const chainHead = this.getChainHead();
    if (chainHead === null) return null;
    return chainHead.handleClassification(value);
  }

  override visitCollection(value: number, results: readonly string[]): string {
    if (results.length === 0) return String(value);
    return results.join("");
  }

  override getAggregatedClassification(value: number): string {
    const classifications = this.traverseChain(value);
    if (classifications.length === 0) return String(value);
    return classifications.join("");
  }

  protected override getChainHead(): IEnterpriseClassificationChainHandler | null {
    return this.registry.getChainHead();
  }
}
