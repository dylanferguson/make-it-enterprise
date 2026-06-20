import type { IServiceLocator } from "../contracts/IServiceLocator.js";

export abstract class AbstractBaseServiceLocator implements IServiceLocator {
  private initialized = false;

  abstract getDivisibilityEvaluator(): ReturnType<IServiceLocator["getDivisibilityEvaluator"]>;
  abstract getOutputFormatter(): ReturnType<IServiceLocator["getOutputFormatter"]>;
  abstract getStrategyFactory(): ReturnType<IServiceLocator["getStrategyFactory"]>;
  abstract getValueResolver(): ReturnType<IServiceLocator["getValueResolver"]>;
  abstract getRangeCalculator(): ReturnType<IServiceLocator["getRangeCalculator"]>;
  abstract getModuloEvaluationStrategyProvider(): ReturnType<IServiceLocator["getModuloEvaluationStrategyProvider"]>;
  abstract getModuloArithmeticStrategyProvider(): ReturnType<IServiceLocator["getModuloArithmeticStrategyProvider"]>;
  abstract getRemainderComputationSupervisor(): ReturnType<IServiceLocator["getRemainderComputationSupervisor"]>;

  protected ensureInitialized(): void {
    if (!this.initialized) {
      this.initialize();
      this.initialized = true;
    }
  }

  protected abstract initialize(): void;
}
