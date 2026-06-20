import type { IFizzBuzzComputationMemento } from "../contracts/IFizzBuzzComputationMemento.js";
import { FizzBuzzComputationMementoImpl } from "../impl/FizzBuzzComputationMementoImpl.js";

export class FizzBuzzComputationMementoFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "FizzBuzzComputationMementoFactoryBeanFactory";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "1.0.0-MEMENTO-FACTORY-BEAN-FACTORY";

  static createMemento(
    snapshotId: string,
    capturedValue: number,
    capturedResult: string,
    capturedStateDescriptor: string,
    originatorName: string,
    originatorVersion: string,
  ): IFizzBuzzComputationMemento {
    return new FizzBuzzComputationMementoImpl(
      snapshotId,
      capturedValue,
      capturedResult,
      capturedStateDescriptor,
      originatorName,
      originatorVersion,
    );
  }

  static getFactoryBeanName(): string {
    return FizzBuzzComputationMementoFactoryBeanFactory.FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzComputationMementoFactoryBeanFactory.FACTORY_BEAN_FACTORY_VERSION;
  }
}
