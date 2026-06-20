import type { IFizzBuzzOutputStringResolutionStrategyRegistry, IFizzBuzzOutputStringResolutionStrategy } from "../../contracts/index.js";

export class DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl
  implements IFizzBuzzOutputStringResolutionStrategyRegistry
{
  private static readonly REGISTRY_NAME = "DefaultFizzBuzzOutputStringResolutionStrategyRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-OUTPUT-STRING-REGISTRY";

  private readonly strategies: Map<string, IFizzBuzzOutputStringResolutionStrategy> = new Map();

  getRegistryName(): string {
    return DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl.REGISTRY_VERSION;
  }

  registerStrategy(strategy: IFizzBuzzOutputStringResolutionStrategy): void {
    const name = strategy.getName();
    if (this.strategies.has(name)) {
      console.debug(
        `[${DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl.REGISTRY_NAME}] ` +
        `Overwriting existing strategy registration: ${name}`,
      );
    }
    this.strategies.set(name, strategy);
  }

  unregisterStrategy(strategyName: string): boolean {
    return this.strategies.delete(strategyName);
  }

  getRegisteredStrategies(): readonly IFizzBuzzOutputStringResolutionStrategy[] {
    return Array.from(this.strategies.values()).sort(
      (a, b) => a.getPriority() - b.getPriority(),
    );
  }

  getStrategyByName(name: string): IFizzBuzzOutputStringResolutionStrategy | null {
    return this.strategies.get(name) ?? null;
  }

  getStrategyCount(): number {
    return this.strategies.size;
  }

  clearRegistry(): void {
    this.strategies.clear();
  }
}
