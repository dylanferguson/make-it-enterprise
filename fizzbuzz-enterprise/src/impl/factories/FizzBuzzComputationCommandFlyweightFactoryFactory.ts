import type { IFizzBuzzComputationCommandFlyweightFactory } from "../../contracts/IFizzBuzzComputationCommandFlyweightFactory.js";
import { FizzBuzzComputationCommandFlyweightFactoryImpl } from "../flyweight/FizzBuzzComputationCommandFlyweightFactoryImpl.js";

export class FizzBuzzComputationCommandFlyweightFactoryFactory {
  private static readonly FACTORY_NAME = "FizzBuzzComputationCommandFlyweightFactoryFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FLYWEIGHT-FACTORY-FACTORY";

  private static flyweightFactory: IFizzBuzzComputationCommandFlyweightFactory | null = null;

  static createFlyweightFactory(): IFizzBuzzComputationCommandFlyweightFactory {
    if (FizzBuzzComputationCommandFlyweightFactoryFactory.flyweightFactory === null) {
      FizzBuzzComputationCommandFlyweightFactoryFactory.flyweightFactory =
        new FizzBuzzComputationCommandFlyweightFactoryImpl();
    }
    return FizzBuzzComputationCommandFlyweightFactoryFactory.flyweightFactory;
  }

  static getFlyweightFactory(): IFizzBuzzComputationCommandFlyweightFactory | null {
    return FizzBuzzComputationCommandFlyweightFactoryFactory.flyweightFactory;
  }

  static getFactoryName(): string {
    return FizzBuzzComputationCommandFlyweightFactoryFactory.FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return FizzBuzzComputationCommandFlyweightFactoryFactory.FACTORY_VERSION;
  }

  static resetFlyweightFactory(): void {
    FizzBuzzComputationCommandFlyweightFactoryFactory.flyweightFactory = null;
  }
}
