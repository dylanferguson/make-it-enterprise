import type { IFizzBuzzComputationBridgeAbstraction } from "../contracts/IFizzBuzzComputationBridgeAbstraction.js";
import type { IBridgeComputationImplementor } from "../contracts/IBridgeComputationImplementor.js";

export abstract class AbstractBaseFizzBuzzComputationBridgeAbstractionImpl
  implements IFizzBuzzComputationBridgeAbstraction
{
  private readonly _bridgeName: string;
  private readonly _bridgeVersion: string;
  private readonly _implementor: IBridgeComputationImplementor;

  constructor(bridgeName: string, bridgeVersion: string, implementor: IBridgeComputationImplementor) {
    this._bridgeName = bridgeName;
    this._bridgeVersion = bridgeVersion;
    this._implementor = implementor;
  }

  getBridgeName(): string {
    return this._bridgeName;
  }

  getBridgeVersion(): string {
    return this._bridgeVersion;
  }

  getImplementor(): IBridgeComputationImplementor {
    return this._implementor;
  }

  resolveComputedValue(value: number, divisor: number): number {
    return this.getImplementor().computeRemainder(value, divisor);
  }

  abstract resolveComputedClassification(value: number, divisor: number): boolean;
}

