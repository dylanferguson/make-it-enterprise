import type { IFizzBuzzComputationTypeFlyweight } from "../contracts/IFizzBuzzComputationTypeFlyweight.js";

export abstract class AbstractBaseFizzBuzzComputationTypeFlyweightImpl
  implements IFizzBuzzComputationTypeFlyweight
{
  private readonly _typeName: string;
  private readonly _typeIdentifier: string;
  private readonly _typeVersion: string;
  private readonly _divisor: number;
  private readonly _displayLabel: string;
  private readonly _ordinalPriority: number;

  constructor(
    typeName: string,
    typeIdentifier: string,
    typeVersion: string,
    divisor: number,
    displayLabel: string,
    ordinalPriority: number,
  ) {
    this._typeName = typeName;
    this._typeIdentifier = typeIdentifier;
    this._typeVersion = typeVersion;
    this._divisor = divisor;
    this._displayLabel = displayLabel;
    this._ordinalPriority = ordinalPriority;
  }

  getTypeName(): string {
    return this._typeName;
  }

  getTypeIdentifier(): string {
    return this._typeIdentifier;
  }

  getTypeVersion(): string {
    return this._typeVersion;
  }

  getDivisor(): number {
    return this._divisor;
  }

  getDisplayLabel(): string {
    return this._displayLabel;
  }

  getOrdinalPriority(): number {
    return this._ordinalPriority;
  }

  abstract evaluate(value: number): boolean;
}

