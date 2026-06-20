import type { IEnterpriseOutputCompositeVisitor } from "../../contracts/IEnterpriseOutputCompositeVisitor.js";
import { AbstractBaseEnterpriseOutputCompositeComponent } from "../../abstracts/AbstractBaseEnterpriseOutputCompositeComponent.js";

export class EnterpriseNumberOutputCompositeLeafImpl
  extends AbstractBaseEnterpriseOutputCompositeComponent
{
  private static readonly COMPONENT_NAME = "EnterpriseNumberOutputCompositeLeaf";
  private static readonly COMPONENT_VERSION = "1.0.0-NUMBER-COMPOSITE-LEAF";
  private static readonly COMPONENT_TYPE = "COMPOSITE_LEAF_NUMBER";
  private static readonly SUPPORTED_DIVISOR = 0;

  constructor() {
    super(
      EnterpriseNumberOutputCompositeLeafImpl.COMPONENT_NAME,
      EnterpriseNumberOutputCompositeLeafImpl.COMPONENT_VERSION,
      EnterpriseNumberOutputCompositeLeafImpl.COMPONENT_TYPE,
      EnterpriseNumberOutputCompositeLeafImpl.SUPPORTED_DIVISOR,
    );
  }

  override accept(
    visitor: IEnterpriseOutputCompositeVisitor,
    value: number,
  ): string {
    this.validateValue(value);
    return visitor.visitLeaf(this, value);
  }

  override canCompose(_value: number): boolean {
    return true;
  }
}
