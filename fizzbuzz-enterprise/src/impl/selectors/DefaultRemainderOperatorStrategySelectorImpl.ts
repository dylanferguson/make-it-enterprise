import { AbstractBaseRemainderOperatorStrategySelector } from "../../abstracts/AbstractBaseRemainderOperatorStrategySelector.js";
import type { IModuloArithmeticStrategy } from "../../contracts/IModuloArithmeticStrategy.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";

export class DefaultRemainderOperatorStrategySelectorImpl extends AbstractBaseRemainderOperatorStrategySelector {
  private static readonly SELECTOR_NAME = "DefaultRemainderOperatorStrategySelector";
  private static readonly SELECTOR_VERSION = "1.0.0-RELEASE";
  private readonly strategyProvider: IModuloArithmeticStrategyProvider;

  constructor(strategyProvider: IModuloArithmeticStrategyProvider) {
    super();
    this.strategyProvider = strategyProvider;
  }

  override selectArithmeticStrategy(divisor: number): IModuloArithmeticStrategy {
    const registered = this.resolveFromRegistry(divisor);
    if (registered !== undefined) {
      this.logSelection(divisor, registered.getArithmeticStrategyName());
      return registered;
    }
    const resolved = this.strategyProvider.getStrategy();
    this.registerStrategy(divisor, resolved);
    this.logSelection(divisor, resolved.getArithmeticStrategyName());
    return resolved;
  }

  override getSelectorName(): string {
    return DefaultRemainderOperatorStrategySelectorImpl.SELECTOR_NAME;
  }

  override getSelectorVersion(): string {
    return DefaultRemainderOperatorStrategySelectorImpl.SELECTOR_VERSION;
  }
}
