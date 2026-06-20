import type { IEnterpriseOutputCompositeVisitor } from "../../contracts/IEnterpriseOutputCompositeVisitor.js";
import type { IEnterpriseOutputCompositeComponent } from "../../contracts/IEnterpriseOutputCompositeComponent.js";
import { AbstractBaseEnterpriseOutputCompositeComponent } from "../../abstracts/AbstractBaseEnterpriseOutputCompositeComponent.js";

export class EnterpriseFizzBuzzOutputCompositeCompositeImpl
  extends AbstractBaseEnterpriseOutputCompositeComponent
{
  private static readonly COMPONENT_NAME = "EnterpriseFizzBuzzOutputCompositeComposite";
  private static readonly COMPONENT_VERSION = "1.0.0-FIZZBUZZ-COMPOSITE-COMPOSITE";
  private static readonly COMPONENT_TYPE = "COMPOSITE_COMPOSITE_FIZZBUZZ";
  private static readonly SUPPORTED_DIVISOR = 15;

  private readonly children: readonly IEnterpriseOutputCompositeComponent[];

  constructor(children: readonly IEnterpriseOutputCompositeComponent[]) {
    super(
      EnterpriseFizzBuzzOutputCompositeCompositeImpl.COMPONENT_NAME,
      EnterpriseFizzBuzzOutputCompositeCompositeImpl.COMPONENT_VERSION,
      EnterpriseFizzBuzzOutputCompositeCompositeImpl.COMPONENT_TYPE,
      EnterpriseFizzBuzzOutputCompositeCompositeImpl.SUPPORTED_DIVISOR,
    );
    this.children = children;
  }

  override accept(
    visitor: IEnterpriseOutputCompositeVisitor,
    value: number,
  ): string {
    this.validateValue(value);
    return visitor.visitComposite(this, this.children, value);
  }

  override canCompose(value: number): boolean {
    this.validateValue(value);
    return value % this.divisor === 0;
  }

  getChildren(): readonly IEnterpriseOutputCompositeComponent[] {
    return this.children;
  }
}
