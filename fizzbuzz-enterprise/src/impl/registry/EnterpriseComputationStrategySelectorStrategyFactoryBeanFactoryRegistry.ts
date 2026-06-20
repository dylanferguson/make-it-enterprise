import type { IEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory } from "../../contracts/IEnterpriseComputationStrategySelectorStrategyFactoryBean.js";
import type { IComputationStrategySelectorStrategy } from "../../contracts/IComputationStrategySelectorStrategy.js";

export class EnterpriseComputationStrategySelectorStrategyFactoryBeanFactoryRegistry {
  private static readonly REGISTRY_NAME = "EnterpriseComputationStrategySelectorStrategyFactoryBeanFactoryRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-REGISTRY-SINGLETON";

  private static factories: IEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory[] = [];
  private static initialized = false;

  static registerFactory(factory: IEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory): void {
    this.factories.push(factory);
  }

  static resolveSelectorStrategy(strategyName?: string): IComputationStrategySelectorStrategy {
    this.ensureInitialized();
    const sorted = [...this.factories]
      .sort((a, b) => b.getFactoryPriority() - a.getFactoryPriority());
    for (const factory of sorted) {
      const candidate = factory.createSelectorStrategy();
      if (!strategyName || candidate.getSelectorStrategyName() === strategyName) {
        return candidate;
      }
    }
    throw new Error(
      `[${this.REGISTRY_NAME}] No selector strategy factory registered for: ${strategyName ?? "default"}`,
    );
  }

  static resetRegistry(): void {
    this.factories = [];
    this.initialized = false;
  }

  static getRegistryName(): string {
    return this.REGISTRY_NAME;
  }

  static getRegistryVersion(): string {
    return this.REGISTRY_VERSION;
  }

  private static ensureInitialized(): void {
    if (!this.initialized) {
      const { StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory } =
        require("../selectors/StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory.js");
      this.registerFactory(new StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory());
      this.initialized = true;
    }
  }
}
