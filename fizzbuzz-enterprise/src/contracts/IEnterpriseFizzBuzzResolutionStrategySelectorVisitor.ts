export interface IEnterpriseFizzBuzzResolutionStrategySelectorVisitor {
  visitForStrategySelection(
    value: number,
    context: string | null,
  ): string | null;
  getVisitorName(): string;
  getVisitorVersion(): string;
  getLastSelectedStrategyName(): string | null;
  getResolutionCategoryDescription(value: number): string;
}
