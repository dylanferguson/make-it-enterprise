import { AbstractBaseStrategyRegistry } from "../../abstracts/AbstractBaseStrategyRegistry.js";
import type { IFizzBuzzStrategy } from "../../contracts/IFizzBuzzStrategy.js";

export class StrategyRegistryImpl extends AbstractBaseStrategyRegistry {
  override registerStrategy(name: string, strategy: IFizzBuzzStrategy): void {
    const key = this.generateStrategyKey(name);
    this.assertNotRegistered(key, name);
    this.strategies.set(key, strategy);
  }

  override getStrategy(name: string): IFizzBuzzStrategy | null {
    const key = this.generateStrategyKey(name);
    const strategy = this.strategies.get(key);
    return strategy ?? null;
  }

  override getAllStrategies(): readonly IFizzBuzzStrategy[] {
    return Array.from(this.strategies.values());
  }

  override getStrategyCount(): number {
    return this.strategies.size;
  }

  override clear(): void {
    this.strategies.clear();
  }
}
