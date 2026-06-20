import type { IFizzBuzzStrategy } from "./IFizzBuzzStrategy.js";

export interface IFizzBuzzStrategyDecorator extends IFizzBuzzStrategy {
  getDecoratedStrategy(): IFizzBuzzStrategy;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
}

