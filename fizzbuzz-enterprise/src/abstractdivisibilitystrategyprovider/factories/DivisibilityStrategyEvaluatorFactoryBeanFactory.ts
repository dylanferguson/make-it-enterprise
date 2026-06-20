import { DivisibilityStrategyEvaluatorImpl } from "../impl/DivisibilityStrategyEvaluatorImpl.js";

export class DivisibilityStrategyEvaluatorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "DivisibilityStrategyEvaluatorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DSE-FBF";

  private static evaluatorRegistry: Map<string, DivisibilityStrategyEvaluatorImpl> = new Map();

  static createEvaluator(name: string, version: string): DivisibilityStrategyEvaluatorImpl {
    const key = `${name}::${version}`;
    const existing = DivisibilityStrategyEvaluatorFactoryBeanFactory.evaluatorRegistry.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const evaluator = new DivisibilityStrategyEvaluatorImpl(name, version);
    DivisibilityStrategyEvaluatorFactoryBeanFactory.evaluatorRegistry.set(key, evaluator);
    return evaluator;
  }

  static getEvaluator(
    name: string,
    version: string,
  ): DivisibilityStrategyEvaluatorImpl | undefined {
    const key = `${name}::${version}`;
    return DivisibilityStrategyEvaluatorFactoryBeanFactory.evaluatorRegistry.get(key);
  }

  static getRegisteredEvaluatorCount(): number {
    return DivisibilityStrategyEvaluatorFactoryBeanFactory.evaluatorRegistry.size;
  }

  static resetRegistry(): void {
    DivisibilityStrategyEvaluatorFactoryBeanFactory.evaluatorRegistry.clear();
  }

  static getFactoryBeanName(): string {
    return DivisibilityStrategyEvaluatorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return DivisibilityStrategyEvaluatorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
