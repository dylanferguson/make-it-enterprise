import type { IFizzBuzzValueTransferObject } from "../contracts/IFizzBuzzValueTransferObject.js";

export abstract class AbstractBaseFizzBuzzValueTransferObject implements IFizzBuzzValueTransferObject {
  protected readonly value: number;
  protected result: string | null;
  protected readonly transferObjectVersion: string;
  protected readonly creationTimestamp: Date;

  constructor(value: number, transferObjectVersion: string = "1.0.0-RELEASE") {
    this.value = value;
    this.result = null;
    this.transferObjectVersion = transferObjectVersion;
    this.creationTimestamp = new Date();
  }

  abstract getValue(): number;
  abstract getResult(): string | null;
  abstract setResult(result: string): void;
  abstract hasResult(): boolean;
  abstract toSerializablePayload(): Record<string, unknown>;
  abstract getTransferObjectVersion(): string;

  getCreationTimestamp(): Date {
    return this.creationTimestamp;
  }

  protected validateValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(`[FizzBuzzValueTransferObject] Invalid value: ${value}`);
    }
  }
}
