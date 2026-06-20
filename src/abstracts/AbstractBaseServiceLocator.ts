import type { IServiceLocator } from "../contracts/IServiceLocator.js";

export abstract class AbstractBaseServiceLocator implements IServiceLocator {
  private initialized = false;

  abstract getDivisibilityEvaluator(): ReturnType<IServiceLocator["getDivisibilityEvaluator"]>;
  abstract getOutputFormatter(): ReturnType<IServiceLocator["getOutputFormatter"]>;
  abstract getStrategyFactory(): ReturnType<IServiceLocator["getStrategyFactory"]>;
  abstract getValueResolver(): ReturnType<IServiceLocator["getValueResolver"]>;
  abstract getRangeCalculator(): ReturnType<IServiceLocator["getRangeCalculator"]>;

  protected ensureInitialized(): void {
    if (!this.initialized) {
      this.initialize();
      this.initialized = true;
    }
  }

  protected abstract initialize(): void;
}
