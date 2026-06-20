import type { IEnterpriseOutputCompositeComponent } from "../../contracts/IEnterpriseOutputCompositeComponent.js";
import type { IEnterpriseOutputCompositeRegistry } from "../../contracts/IEnterpriseOutputCompositeRegistry.js";

export class InMemoryEnterpriseOutputCompositeRegistryImpl
  implements IEnterpriseOutputCompositeRegistry
{
  private static readonly REGISTRY_NAME = "InMemoryEnterpriseOutputCompositeRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-COMPOSITE-REGISTRY";

  private readonly components: Map<string, IEnterpriseOutputCompositeComponent>;
  private readonly divisorIndex: Map<number, IEnterpriseOutputCompositeComponent>;

  constructor() {
    this.components = new Map();
    this.divisorIndex = new Map();
  }

  getRegistryName(): string {
    return InMemoryEnterpriseOutputCompositeRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return InMemoryEnterpriseOutputCompositeRegistryImpl.REGISTRY_VERSION;
  }

  registerComponent(component: IEnterpriseOutputCompositeComponent): void {
    this.components.set(component.getComponentName(), component);
    this.divisorIndex.set(component.getDivisor(), component);
  }

  unregisterComponent(componentName: string): boolean {
    const component = this.components.get(componentName);
    if (component === undefined) {
      return false;
    }
    this.components.delete(componentName);
    this.divisorIndex.delete(component.getDivisor());
    return true;
  }

  getComponent(componentName: string): IEnterpriseOutputCompositeComponent | null {
    return this.components.get(componentName) ?? null;
  }

  getComponentByDivisor(
    divisor: number,
  ): IEnterpriseOutputCompositeComponent | null {
    return this.divisorIndex.get(divisor) ?? null;
  }

  getAllComponents(): readonly IEnterpriseOutputCompositeComponent[] {
    return Array.from(this.components.values());
  }

  getRegisteredComponentCount(): number {
    return this.components.size;
  }

  getRegisteredComponentNames(): readonly string[] {
    return Array.from(this.components.keys());
  }
}
