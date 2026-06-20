import type { IEnterpriseFizzBuzzResolutionStrategySelectorVisitor } from "../contracts/IEnterpriseFizzBuzzResolutionStrategySelectorVisitor.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResolutionStrategySelectorVisitor
  implements IEnterpriseFizzBuzzResolutionStrategySelectorVisitor
{
  private static readonly DEFAULT_VISITOR_VENDOR = "FizzBuzzEnterpriseVisitorArchitectureGroup";
  private lastSelectedStrategyName: string | null = null;

  abstract visitForStrategySelection(
    value: number,
    context: string | null,
  ): string | null;

  abstract getVisitorName(): string;
  abstract getVisitorVersion(): string;

  getLastSelectedStrategyName(): string | null {
    return this.lastSelectedStrategyName;
  }

  protected setLastSelectedStrategyName(strategyName: string | null): void {
    this.lastSelectedStrategyName = strategyName;
  }

  abstract getResolutionCategoryDescription(value: number): string;
}
