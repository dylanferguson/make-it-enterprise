import type { IRemainderComputationStrategy } from "../../contracts/IRemainderComputationStrategy.js";
import type { IRemainderComputationStrategyProvider } from "../../contracts/IRemainderComputationStrategyProvider.js";
import { DivisorBasedRemainderComputationStrategySelectorImpl } from "../selectors/DivisorBasedRemainderComputationStrategySelectorImpl.js";
import { StandardRemainderComputationStrategyProviderImpl } from "../providers/StandardRemainderComputationStrategyProviderImpl.js";

export class RemainderComputationStrategyFactoryImpl {
  private static readonly FACTORY_NAME = "RemainderComputationStrategyFactory";
  private static readonly FACTORY_VERSION = "1.0.0-REMAINDER-STRATEGY-FACTORY";

  private static singletonProvider: IRemainderComputationStrategyProvider | null = null;

  static getFactoryName(): string {
    return RemainderComputationStrategyFactoryImpl.FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return RemainderComputationStrategyFactoryImpl.FACTORY_VERSION;
  }

  static createProvider(): IRemainderComputationStrategyProvider {
    if (RemainderComputationStrategyFactoryImpl.singletonProvider !== null) {
      return RemainderComputationStrategyFactoryImpl.singletonProvider;
    }
    const selector = new DivisorBasedRemainderComputationStrategySelectorImpl();
    const provider = new StandardRemainderComputationStrategyProviderImpl(selector);
    RemainderComputationStrategyFactoryImpl.singletonProvider = provider;
    return provider;
  }

  static getProvider(): IRemainderComputationStrategyProvider | null {
    return RemainderComputationStrategyFactoryImpl.singletonProvider;
  }

  static resetProvider(): void {
    RemainderComputationStrategyFactoryImpl.singletonProvider = null;
  }
}
