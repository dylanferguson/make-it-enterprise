import type { IFizzBuzzComputedOutcomeTransferObject } from "./IFizzBuzzComputedOutcomeTransferObject.js";

export abstract class AbstractBaseFizzBuzzComputedOutcomeTransferObject
  implements IFizzBuzzComputedOutcomeTransferObject
{
  protected readonly primaryKey: number;
  protected readonly computedValue: string;
  protected readonly inputValue: number;
  protected readonly resolutionTimestamp: number;
  protected abstract readonly transferObjectName: string;
  protected abstract readonly transferObjectVersion: string;

  constructor(primaryKey: number, inputValue: number, computedValue: string) {
    this.primaryKey = primaryKey;
    this.inputValue = inputValue;
    this.computedValue = computedValue;
    this.resolutionTimestamp = Date.now();
  }

  getPrimaryKey(): number {
    return this.primaryKey;
  }

  getComputedValue(): string {
    return this.computedValue;
  }

  getInputValue(): number {
    return this.inputValue;
  }

  getResolutionTimestamp(): number {
    return this.resolutionTimestamp;
  }

  getTransferObjectName(): string {
    return this.transferObjectName;
  }

  getTransferObjectVersion(): string {
    return this.transferObjectVersion;
  }

  toDiagnosticString(): string {
    return `[${this.transferObjectName} v${this.transferObjectVersion}] ` +
      `pk=[${this.primaryKey}] input=[${this.inputValue}] ` +
      `output=[${this.computedValue}] ts=[${this.resolutionTimestamp}]`;
  }
}
