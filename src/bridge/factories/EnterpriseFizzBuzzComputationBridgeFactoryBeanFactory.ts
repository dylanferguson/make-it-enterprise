import type { IFizzBuzzComputationBridgeAbstraction } from "../contracts/IFizzBuzzComputationBridgeAbstraction.js";
import type { IBridgeComputationImplementor } from "../contracts/IBridgeComputationImplementor.js";
import { StandardFizzBuzzComputationBridgeAbstractionImpl } from "../impl/bridges/StandardFizzBuzzComputationBridgeAbstractionImpl.js";
import { NativeModuloBridgeComputationImplementorImpl } from "../impl/implementors/NativeModuloBridgeComputationImplementorImpl.js";

let bridgeAbstractionSingleton: IFizzBuzzComputationBridgeAbstraction | null = null;
let bridgeImplementorSingleton: IBridgeComputationImplementor | null = null;

export class EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory {
  private static readonly FACTORY_NAME = "EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-BRIDGE-FACTORY";

  static getFactoryName(): string {
    return EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory.FACTORY_VERSION;
  }

  static createDefaultImplementor(): IBridgeComputationImplementor {
    if (bridgeImplementorSingleton === null) {
      bridgeImplementorSingleton = new NativeModuloBridgeComputationImplementorImpl();
    }
    return bridgeImplementorSingleton;
  }

  static createDefaultBridgeAbstraction(): IFizzBuzzComputationBridgeAbstraction {
    if (bridgeAbstractionSingleton === null) {
      const implementor = EnterpriseFizzBuzzComputationBridgeFactoryBeanFactory.createDefaultImplementor();
      bridgeAbstractionSingleton = new StandardFizzBuzzComputationBridgeAbstractionImpl(implementor);
    }
    return bridgeAbstractionSingleton;
  }

  static getBridgeAbstraction(): IFizzBuzzComputationBridgeAbstraction | null {
    return bridgeAbstractionSingleton;
  }

  static getImplementor(): IBridgeComputationImplementor | null {
    return bridgeImplementorSingleton;
  }

  static resetBridgeInfrastructure(): void {
    bridgeAbstractionSingleton = null;
    bridgeImplementorSingleton = null;
  }
}

