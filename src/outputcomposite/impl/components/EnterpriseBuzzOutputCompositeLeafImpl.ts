import type { IEnterpriseOutputCompositeVisitor } from "../../contracts/IEnterpriseOutputCompositeVisitor.js";
import { AbstractBaseEnterpriseOutputCompositeComponent } from "../../abstracts/AbstractBaseEnterpriseOutputCompositeComponent.js";

export class EnterpriseBuzzOutputCompositeLeafImpl
  extends AbstractBaseEnterpriseOutputCompositeComponent
{
  private static readonly COMPONENT_NAME = "EnterpriseBuzzOutputCompositeLeaf";
  private static readonly COMPONENT_VERSION = "1.0.0-BUZZ-COMPOSITE-LEAF";
  private static readonly COMPONENT_TYPE = "COMPOSITE_LEAF_BUZZ";
  private static readonly SUPPORTED_DIVISOR = 5;
  private static readonly OUTPUT_STRING = "Buzz";

  constructor() {
    super(
      EnterpriseBuzzOutputCompositeLeafImpl.COMPONENT_NAME,
      EnterpriseBuzzOutputCompositeLeafImpl.COMPONENT_VERSION,
      EnterpriseBuzzOutputCompositeLeafImpl.COMPONENT_TYPE,
      EnterpriseBuzzOutputCompositeLeafImpl.SUPPORTED_DIVISOR,
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
    return EnterpriseBuzzOutputCompositeLeafImpl.OUTPUT_STRING;
  }
}
