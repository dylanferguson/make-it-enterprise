import type { IFizzBuzzComputationBridge } from "../../contracts/IFizzBuzzComputationBridge.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../../contracts/IRangeCalculator.js";
import type { IFizzBuzzStrategyFlyweightFactory } from "../../contracts/IFizzBuzzStrategyFlyweightFactory.js";
import { StandardFizzBuzzComputationBridgeImpl } from "../bridge/StandardFizzBuzzComputationBridgeImpl.js";
import { ModuloDelegatingFizzBuzzComputationBridgeImpl } from "../bridge/ModuloDelegatingFizzBuzzComputationBridgeImpl.js";
import { FizzBuzzStrategyFlyweightFactoryBean } from "./FizzBuzzStrategyFlyweightFactoryBean.js";

export enum FizzBuzzComputationBridgeType {
  STANDARD = "STANDARD",
  MODULO_DELEGATING = "MODULO_DELEGATING",
}

export class FizzBuzzComputationBridgeFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzComputationBridgeFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0";

  private readonly bridgeType: FizzBuzzComputationBridgeType;
  private readonly valueResolver: ICompositeValueResolver;
  private readonly rangeCalculator: IRangeCalculator;
  private strategyFlyweightFactory: IFizzBuzzStrategyFlyweightFactory | null = null;

  constructor(
    bridgeType: FizzBuzzComputationBridgeType = FizzBuzzComputationBridgeType.MODULO_DELEGATING,
    valueResolver: ICompositeValueResolver,
    rangeCalculator: IRangeCalculator,
  ) {
    this.bridgeType = bridgeType;
    this.valueResolver = valueResolver;
    this.rangeCalculator = rangeCalculator;
  }

  setStrategyFlyweightFactory(factory: IFizzBuzzStrategyFlyweightFactory): void {
    this.strategyFlyweightFactory = factory;
  }

  createBridge(): IFizzBuzzComputationBridge {
    console.debug(
      `[${FizzBuzzComputationBridgeFactoryBean.FACTORY_BEAN_NAME}] Creating bridge of type: ${this.bridgeType} (v${FizzBuzzComputationBridgeFactoryBean.FACTORY_BEAN_VERSION})`,
    );

    switch (this.bridgeType) {
      case FizzBuzzComputationBridgeType.STANDARD:
        return new StandardFizzBuzzComputationBridgeImpl(
          this.valueResolver,
          this.rangeCalculator,
        );
      case FizzBuzzComputationBridgeType.MODULO_DELEGATING:
        return new ModuloDelegatingFizzBuzzComputationBridgeImpl(
          this.valueResolver,
          this.rangeCalculator,
          this.strategyFlyweightFactory ?? FizzBuzzStrategyFlyweightFactoryBean.createFlyweightFactory(),
        );
      default:
        throw new Error(
          `[${FizzBuzzComputationBridgeFactoryBean.FACTORY_BEAN_NAME}] Unknown bridge type: ${this.bridgeType}`,
        );
    }
  }

  getBridgeType(): FizzBuzzComputationBridgeType {
    return this.bridgeType;
  }
}

export class FizzBuzzComputationBridgeFactoryBeanFactory {
  static createFactoryBean(
    bridgeType: FizzBuzzComputationBridgeType,
    valueResolver: ICompositeValueResolver,
    rangeCalculator: IRangeCalculator,
  ): FizzBuzzComputationBridgeFactoryBean {
    return new FizzBuzzComputationBridgeFactoryBean(
      bridgeType,
      valueResolver,
      rangeCalculator,
    );
  }
}
