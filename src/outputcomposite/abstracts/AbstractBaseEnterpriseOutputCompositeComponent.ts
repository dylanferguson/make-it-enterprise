import type { IEnterpriseOutputCompositeComponent } from "../contracts/IEnterpriseOutputCompositeComponent.js";
import type { IEnterpriseOutputCompositeVisitor } from "../contracts/IEnterpriseOutputCompositeVisitor.js";

export abstract class AbstractBaseEnterpriseOutputCompositeComponent
  implements IEnterpriseOutputCompositeComponent
{
  private static readonly COMPONENT_FRAMEWORK_VERSION = "1.0.0-COMPOSITE-FRAMEWORK";

  protected readonly componentName: string;
  protected readonly componentVersion: string;
  protected readonly componentType: string;
  protected readonly divisor: number;

  constructor(
    componentName: string,
    componentVersion: string,
    componentType: string,
    divisor: number,
  ) {
    this.componentName = componentName;
    this.componentVersion = componentVersion;
    this.componentType = componentType;
    this.divisor = divisor;
  }

  abstract accept(
    visitor: IEnterpriseOutputCompositeVisitor,
    value: number,
  ): string;
  abstract canCompose(value: number): boolean;

  getComponentName(): string {
    return this.componentName;
  }

  getComponentVersion(): string {
    return this.componentVersion;
  }

  getComponentType(): string {
    return this.componentType;
  }

  getDivisor(): number {
    return this.divisor;
  }

  protected getComponentFrameworkVersion(): string {
    return AbstractBaseEnterpriseOutputCompositeComponent.COMPONENT_FRAMEWORK_VERSION;
  }

  protected validateValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.componentName} v${this.componentVersion}] Invalid composite value: ${value}. Must be a finite number.`,
      );
    }
  }
}
