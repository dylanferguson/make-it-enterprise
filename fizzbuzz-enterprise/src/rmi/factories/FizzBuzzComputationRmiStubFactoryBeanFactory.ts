import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import { FizzBuzzComputationRmiRemoteImpl } from "../impl/FizzBuzzComputationRmiRemoteImpl.js";

export class FizzBuzzComputationRmiStubFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzComputationRmiStubFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-RMI-STUB-FACTORY-BEAN";

  private static remoteImpl: FizzBuzzComputationRmiRemoteImpl | null = null;

  static getFactoryBeanName(): string {
    return FizzBuzzComputationRmiStubFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzComputationRmiStubFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static createRemoteObject(facade: IFizzBuzzSingleValueResolutionFacade): FizzBuzzComputationRmiRemoteImpl {
    FizzBuzzComputationRmiStubFactoryBeanFactory.remoteImpl =
      new FizzBuzzComputationRmiRemoteImpl(facade);
    return FizzBuzzComputationRmiStubFactoryBeanFactory.remoteImpl;
  }

  static getRemoteObject(): FizzBuzzComputationRmiRemoteImpl | null {
    return FizzBuzzComputationRmiStubFactoryBeanFactory.remoteImpl;
  }
}
