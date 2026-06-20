import type { IEnterpriseOutputCompositeVisitor } from "./IEnterpriseOutputCompositeVisitor.js";

export interface IEnterpriseOutputCompositeComponent {
  getComponentName(): string;
  getComponentVersion(): string;
  getComponentType(): string;
  accept(visitor: IEnterpriseOutputCompositeVisitor, value: number): string;
  getDivisor(): number;
  canCompose(value: number): boolean;
}
