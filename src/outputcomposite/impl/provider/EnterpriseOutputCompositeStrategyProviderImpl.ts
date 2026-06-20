import { AbstractBaseEnterpriseOutputCompositeStrategyProvider } from "../../abstracts/AbstractBaseEnterpriseOutputCompositeStrategyProvider.js";
import type { IEnterpriseOutputCompositeComponent } from "../../contracts/IEnterpriseOutputCompositeComponent.js";
import type { IEnterpriseOutputCompositeVisitor } from "../../contracts/IEnterpriseOutputCompositeVisitor.js";
import type { IEnterpriseOutputCompositeRegistry } from "../../contracts/IEnterpriseOutputCompositeRegistry.js";

export class EnterpriseOutputCompositeStrategyProviderImpl
  extends AbstractBaseEnterpriseOutputCompositeStrategyProvider
{
  private static readonly PROVIDER_NAME = "EnterpriseOutputCompositeStrategyProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-COMPOSITE-STRATEGY-PROVIDER";
  private static readonly DEFAULT_COMPOSITE_SEPARATOR = "";
  private static readonly DEFAULT_COMPOSITE_ENABLED = true;
  private static readonly FALLBACK_DIVISOR = 0;

  private readonly visitor: IEnterpriseOutputCompositeVisitor;
  private resolutionCount: number = 0;

  constructor(visitor: IEnterpriseOutputCompositeVisitor) {
    super(
      EnterpriseOutputCompositeStrategyProviderImpl.PROVIDER_NAME,
      EnterpriseOutputCompositeStrategyProviderImpl.PROVIDER_VERSION,
      EnterpriseOutputCompositeStrategyProviderImpl.DEFAULT_COMPOSITE_SEPARATOR,
      EnterpriseOutputCompositeStrategyProviderImpl.DEFAULT_COMPOSITE_ENABLED,
    );
    this.visitor = visitor;
  }

  override resolveCompositeOutput(value: number): string {
    this.resolutionCount++;
    if (!this.compositeResolutionEnabled || this.registry === null) {
      return value.toString();
    }

    const allComponents = this.registry.getAllComponents();
    const composedParts: string[] = [];

    for (const component of allComponents) {
      if (
        component.getComponentType() !== "COMPOSITE_LEAF_NUMBER" &&
        component.canCompose(value)
      ) {
        const componentResult = component.accept(this.visitor, value);
        if (componentResult.length > 0) {
          composedParts.push(componentResult);
        }
      }
    }

    if (composedParts.length > 0) {
      return composedParts.join(
        EnterpriseOutputCompositeStrategyProviderImpl.DEFAULT_COMPOSITE_SEPARATOR,
      );
    }

    return value.toString();
  }

  getResolutionCount(): number {
    return this.resolutionCount;
  }

  getVisitor(): IEnterpriseOutputCompositeVisitor {
    return this.visitor;
  }
}
