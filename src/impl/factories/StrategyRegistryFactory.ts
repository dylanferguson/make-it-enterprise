import type { IStrategyRegistry } from "../../contracts/IStrategyRegistry.js";
import { StrategyRegistryImpl } from "../registry/StrategyRegistryImpl.js";

export class StrategyRegistryFactory {
  private static instance: IStrategyRegistry | null = null;

  static createRegistry(): IStrategyRegistry {
    if (StrategyRegistryFactory.instance === null) {
      StrategyRegistryFactory.instance = new StrategyRegistryImpl();
    }
    return StrategyRegistryFactory.instance;
  }

  static resetRegistry(): void {
    StrategyRegistryFactory.instance = null;
  }
}
