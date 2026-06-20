import type { IFizzBuzzStrategy } from "./IFizzBuzzStrategy.js";

export interface IStrategyRegistry {
  registerStrategy(name: string, strategy: IFizzBuzzStrategy): void;
  getStrategy(name: string): IFizzBuzzStrategy | null;
  getAllStrategies(): readonly IFizzBuzzStrategy[];
  getStrategyCount(): number;
  clear(): void;
}
