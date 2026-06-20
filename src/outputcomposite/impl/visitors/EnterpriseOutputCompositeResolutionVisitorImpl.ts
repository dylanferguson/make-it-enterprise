import type { IEnterpriseOutputCompositeComponent } from "../../contracts/IEnterpriseOutputCompositeComponent.js";
import type { IEnterpriseOutputCompositeVisitor } from "../../contracts/IEnterpriseOutputCompositeVisitor.js";

export class EnterpriseOutputCompositeResolutionVisitorImpl
  implements IEnterpriseOutputCompositeVisitor
{
  private static readonly VISITOR_NAME = "EnterpriseOutputCompositeResolutionVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-COMPOSITE-RESOLUTION-VISITOR";
  private static readonly COMPOSITE_SEPARATOR = "";
  private static readonly UNRESOLVED_CHILD_MARKER = "UNRESOLVED";

  private visitCount: number = 0;

  getVisitorName(): string {
    return EnterpriseOutputCompositeResolutionVisitorImpl.VISITOR_NAME;
  }

  getVisitorVersion(): string {
    return EnterpriseOutputCompositeResolutionVisitorImpl.VISITOR_VERSION;
  }

  getCompositeSeparator(): string {
    return EnterpriseOutputCompositeResolutionVisitorImpl.COMPOSITE_SEPARATOR;
  }

  getVisitCount(): number {
    return this.visitCount;
  }

  visitLeaf(
    component: IEnterpriseOutputCompositeComponent,
    value: number,
  ): string {
    this.visitCount++;
    const componentName = component.getComponentName();
    const resolvedViaRemainder = component.canCompose(value);

    if (!resolvedViaRemainder) {
      return EnterpriseOutputCompositeResolutionVisitorImpl.UNRESOLVED_CHILD_MARKER;
    }

    return this.resolveLeafOutput(component);
  }

  visitComposite(
    composite: IEnterpriseOutputCompositeComponent,
    children: readonly IEnterpriseOutputCompositeComponent[],
    value: number,
  ): string {
    this.visitCount++;
    const resolvedParts: string[] = [];

    for (const child of children) {
      const childResult = child.accept(this, value);
      if (
        childResult !== EnterpriseOutputCompositeResolutionVisitorImpl.UNRESOLVED_CHILD_MARKER
      ) {
        resolvedParts.push(childResult);
      }
    }

    if (resolvedParts.length > 0) {
      return resolvedParts.join(
        EnterpriseOutputCompositeResolutionVisitorImpl.COMPOSITE_SEPARATOR,
      );
    }

    if (composite.canCompose(value)) {
      return this.resolveLeafOutput(composite);
    }

    return value.toString();
  }

  private resolveLeafOutput(
    component: IEnterpriseOutputCompositeComponent,
  ): string {
    const componentType = component.getComponentType();
    switch (componentType) {
      case "COMPOSITE_LEAF_FIZZ":
        return "Fizz";
      case "COMPOSITE_LEAF_BUZZ":
        return "Buzz";
      case "COMPOSITE_COMPOSITE_FIZZBUZZ":
        return "FizzBuzz";
      case "COMPOSITE_LEAF_NUMBER":
        return "";
      default:
        return "";
    }
  }
}
