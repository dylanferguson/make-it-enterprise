import type { IFizzBuzzStrategy } from "./IFizzBuzzStrategy.js";

export interface IFizzBuzzStrategyFlyweightFactory {
  getStrategy(key: string): IFizzBuzzStrategy | null;
  registerStrategy(key: string, strategy: IFizzBuzzStrategy): void;
  getOrCreateStrategy(key: string, factory: () => IFizzBuzzStrategy): IFizzBuzzStrategy;
  clearCache(): void;
  getCacheSize(): number;
  getFlyweightFactoryName(): string;
}
