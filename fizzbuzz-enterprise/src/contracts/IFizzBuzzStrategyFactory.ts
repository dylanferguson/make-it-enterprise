import type { IFizzBuzzStrategy } from "./IFizzBuzzStrategy.js";

export interface IFizzBuzzStrategyFactory {
  createStrategies(): readonly IFizzBuzzStrategy[];
}
