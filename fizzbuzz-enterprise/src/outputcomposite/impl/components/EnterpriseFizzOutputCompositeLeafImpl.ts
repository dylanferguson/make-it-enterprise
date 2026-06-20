import type { IEnterpriseOutputCompositeVisitor } from "../../contracts/IEnterpriseOutputCompositeVisitor.js";
import { AbstractBaseEnterpriseOutputCompositeComponent } from "../../abstracts/AbstractBaseEnterpriseOutputCompositeComponent.js";

export class EnterpriseFizzOutputCompositeLeafImpl
  extends AbstractBaseEnterpriseOutputCompositeComponent
{
  private static readonly COMPONENT_NAME = "EnterpriseFizzOutputCompositeLeaf";
  private static readonly COMPONENT_VERSION = "1.0.0-FIZZ-COMPOSITE-LEAF";
  private static readonly COMPONENT_TYPE = "COMPOSITE_LEAF_FIZZ";
  private static readonly SUPPORTED_DIVISOR = 3;
  private static readonly OUTPUT_STRING = "Fizz";

  constructor() {
    super(
      EnterpriseFizzOutputCompositeLeafImpl.COMPONENT_NAME,
      EnterpriseFizzOutputCompositeLeafImpl.COMPONENT_VERSION,
      EnterpriseFizzOutputCompositeLeafImpl.COMPONENT_TYPE,
      EnterpriseFizzOutputCompositeLeafImpl.SUPPORTED_DIVISOR,
    );
  }

  override accept(
    visitor: IEnterpriseOutputCompositeVisitor,
    value: number,
  ): string {
    this.validateValue(value);
    return visitor.visitLeaf(this, value);
  }

  override canCompose(value: number): boolean {
    this.validateValue(value);
    return value % this.divisor === 0;
  }

  getOutputString(): string {
    return EnterpriseFizzOutputCompositeLeafImpl.OUTPUT_STRING;
  }
}
