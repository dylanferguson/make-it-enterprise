import { AbstractBaseEnterpriseDivisibilityExpressionEvaluatorRegistry } from "../../abstracts/index.js";
import type { IEnterpriseDivisibilityExpression, IEnterpriseDivisibilityExpressionEvaluator } from "../../contracts/index.js";

export class DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl
  extends AbstractBaseEnterpriseDivisibilityExpressionEvaluatorRegistry
{
  private static readonly REGISTRY_NAME = "DefaultEnterpriseDivisibilityExpressionEvaluatorRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-EXPRESSION-EVALUATOR-REGISTRY";

  private readonly evaluators: Map<string, IEnterpriseDivisibilityExpressionEvaluator>;

  constructor() {
    super(
      DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl.REGISTRY_NAME,
      DefaultEnterpriseDivisibilityExpressionEvaluatorRegistryImpl.REGISTRY_VERSION,
    );
    this.evaluators = new Map();
  }

  override registerEvaluator(evaluator: IEnterpriseDivisibilityExpressionEvaluator): void {
    this.evaluators.set(evaluator.getEvaluatorName(), evaluator);
  }

  override unregisterEvaluator(evaluatorName: string): boolean {
    return this.evaluators.delete(evaluatorName);
  }

  override resolveEvaluator(expression: IEnterpriseDivisibilityExpression): IEnterpriseDivisibilityExpressionEvaluator | null {
    for (const evaluator of this.evaluators.values()) {
      if (evaluator.canEvaluate(expression)) {
        return evaluator;
      }
    }
    return null;
  }

  override getRegisteredEvaluatorNames(): readonly string[] {
    return Array.from(this.evaluators.keys());
  }

  override getEvaluatorCount(): number {
    return this.evaluators.size;
  }

  override clearRegistry(): void {
    this.evaluators.clear();
  }
}
