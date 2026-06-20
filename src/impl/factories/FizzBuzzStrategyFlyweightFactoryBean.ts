import type { IFizzBuzzStrategyFlyweightFactory } from "../../contracts/IFizzBuzzStrategyFlyweightFactory.js";
import { FizzBuzzStrategyFlyweightFactoryImpl } from "../flyweight/FizzBuzzStrategyFlyweightFactoryImpl.js";

export class FizzBuzzStrategyFlyweightFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzStrategyFlyweightFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0";
  private static instance: FizzBuzzStrategyFlyweightFactoryImpl | null = null;

  static createFlyweightFactory(): FizzBuzzStrategyFlyweightFactoryImpl {
    if (FizzBuzzStrategyFlyweightFactoryBean.instance === null) {
      console.debug(
        `[${FizzBuzzStrategyFlyweightFactoryBean.FACTORY_BEAN_NAME}] Creating singleton FizzBuzzStrategyFlyweightFactoryImpl`,
      );
      FizzBuzzStrategyFlyweightFactoryBean.instance = new FizzBuzzStrategyFlyweightFactoryImpl();
    }
    return FizzBuzzStrategyFlyweightFactoryBean.instance;
  }

  static resetFlyweightFactory(): void {
    if (FizzBuzzStrategyFlyweightFactoryBean.instance !== null) {
      FizzBuzzStrategyFlyweightFactoryBean.instance.clearCache();
    }
    FizzBuzzStrategyFlyweightFactoryBean.instance = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzStrategyFlyweightFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzStrategyFlyweightFactoryBean.FACTORY_BEAN_VERSION;
  }
}
