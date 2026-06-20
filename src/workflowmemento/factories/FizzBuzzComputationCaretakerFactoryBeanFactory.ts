import type { IFizzBuzzComputationCaretaker } from "../contracts/IFizzBuzzComputationCaretaker.js";
import { FizzBuzzComputationCaretakerImpl } from "../impl/FizzBuzzComputationCaretakerImpl.js";

export class FizzBuzzComputationCaretakerFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "FizzBuzzComputationCaretakerFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-CARETAKER-FACTORY-BEAN-FACTORY";

  private static caretakerSingleton: IFizzBuzzComputationCaretaker | null = null;

  static createCaretaker(): IFizzBuzzComputationCaretaker {
    if (FizzBuzzComputationCaretakerFactoryBeanFactory.caretakerSingleton === null) {
      FizzBuzzComputationCaretakerFactoryBeanFactory.caretakerSingleton =
        new FizzBuzzComputationCaretakerImpl();
    }
    return FizzBuzzComputationCaretakerFactoryBeanFactory.caretakerSingleton;
  }

  static getCaretaker(): IFizzBuzzComputationCaretaker | null {
    return FizzBuzzComputationCaretakerFactoryBeanFactory.caretakerSingleton;
  }

  static isInitialized(): boolean {
    return FizzBuzzComputationCaretakerFactoryBeanFactory.caretakerSingleton !== null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzComputationCaretakerFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzComputationCaretakerFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}
