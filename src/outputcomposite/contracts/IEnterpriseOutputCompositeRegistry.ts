import type { IEnterpriseOutputCompositeComponent } from "./IEnterpriseOutputCompositeComponent.js";

export interface IEnterpriseOutputCompositeRegistry {
  getRegistryName(): string;
  getRegistryVersion(): string;
  registerComponent(component: IEnterpriseOutputCompositeComponent): void;
  unregisterComponent(componentName: string): boolean;
  getComponent(componentName: string): IEnterpriseOutputCompositeComponent | null;
  getComponentByDivisor(divisor: number): IEnterpriseOutputCompositeComponent | null;
  getAllComponents(): readonly IEnterpriseOutputCompositeComponent[];
  getRegisteredComponentCount(): number;
  getRegisteredComponentNames(): readonly string[];
}
