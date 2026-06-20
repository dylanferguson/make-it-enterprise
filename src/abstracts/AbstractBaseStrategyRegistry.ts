import type { IFizzBuzzStrategy } from "../contracts/IFizzBuzzStrategy.js";
import type { IStrategyRegistry } from "../contracts/IStrategyRegistry.js";

export abstract class AbstractBaseStrategyRegistry implements IStrategyRegistry {
  protected readonly strategies: Map<string, IFizzBuzzStrategy> = new Map();

  abstract registerStrategy(name: string, strategy: IFizzBuzzStrategy): void;
  abstract getStrategy(name: string): IFizzBuzzStrategy | null;
  abstract getAllStrategies(): readonly IFizzBuzzStrategy[];
  abstract getStrategyCount(): number;
  abstract clear(): void;

  protected generateStrategyKey(name: string): string {
    return `strategy:${name.toLowerCase().replace(/\s+/g, "_")}`;
  }

  protected assertNotRegistered(key: string, name: string): void {
    if (this.strategies.has(key)) {
      throw new Error(`Strategy '${name}' is already registered in the registry`);
    }
  }
}
