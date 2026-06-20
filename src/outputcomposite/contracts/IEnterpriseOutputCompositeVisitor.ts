import type { IEnterpriseOutputCompositeComponent } from "./IEnterpriseOutputCompositeComponent.js";

export interface IEnterpriseOutputCompositeVisitor {
  getVisitorName(): string;
  getVisitorVersion(): string;
  visitLeaf(
    component: IEnterpriseOutputCompositeComponent,
    value: number,
  ): string;
  visitComposite(
    composite: IEnterpriseOutputCompositeComponent,
    children: readonly IEnterpriseOutputCompositeComponent[],
    value: number,
  ): string;
  getCompositeSeparator(): string;
}
