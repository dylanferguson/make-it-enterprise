import type { IComputationRequestPrototype } from "../../../contracts/IComputationRequestPrototype.js";
import { FizzBuzzComputationRequestPrototypeImpl } from "../FizzBuzzComputationRequestPrototypeImpl.js";

export class ComputationRequestPrototypeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ComputationRequestPrototypeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PROTOTYPE-FACTORY-BEAN";

  private static registeredPrototypeCount: number = 0;

  static createPrototype(
    parameterValue: number,
    prototypeId?: string,
  ): IComputationRequestPrototype<string> {
    const prototype = new FizzBuzzComputationRequestPrototypeImpl(
      parameterValue,
      prototypeId,
    );
    ComputationRequestPrototypeFactoryBeanFactory.registeredPrototypeCount++;
    return prototype;
  }

  static clonePrototype(
    source: IComputationRequestPrototype<string>,
  ): IComputationRequestPrototype<string> {
    const cloned = source.clone();
    ComputationRequestPrototypeFactoryBeanFactory.registeredPrototypeCount++;
    return cloned;
  }

  static getPrototypeCount(): number {
    return ComputationRequestPrototypeFactoryBeanFactory.registeredPrototypeCount;
  }

  static getFactoryBeanName(): string {
    return ComputationRequestPrototypeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ComputationRequestPrototypeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
