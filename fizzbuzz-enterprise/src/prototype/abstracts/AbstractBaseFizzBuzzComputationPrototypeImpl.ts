import type { IFizzBuzzComputationPrototype } from "../contracts/IFizzBuzzComputationPrototype.js";

export abstract class AbstractBaseFizzBuzzComputationPrototypeImpl
  implements IFizzBuzzComputationPrototype
{
  private readonly _prototypeName: string;
  private readonly _prototypeIdentifier: string;
  private readonly _prototypeVersion: string;
  private _configuration: Record<string, unknown>;

  constructor(
    prototypeName: string,
    prototypeIdentifier: string,
    prototypeVersion: string,
  ) {
    this._prototypeName = prototypeName;
    this._prototypeIdentifier = prototypeIdentifier;
    this._prototypeVersion = prototypeVersion;
    this._configuration = {};
  }

  getPrototypeName(): string {
    return this._prototypeName;
  }

  getPrototypeIdentifier(): string {
    return this._prototypeIdentifier;
  }

  getPrototypeVersion(): string {
    return this._prototypeVersion;
  }

  configure(configuration: Record<string, unknown>): void {
    this._configuration = { ...this._configuration, ...configuration };
  }

  getConfiguration(): Record<string, unknown> {
    return { ...this._configuration };
  }

  isConfigurable(): boolean {
    return true;
  }

  abstract clone(): IFizzBuzzComputationPrototype;

  protected copyConfigurationTo(target: AbstractBaseFizzBuzzComputationPrototypeImpl): void {
    target._configuration = { ...this._configuration };
  }
}

