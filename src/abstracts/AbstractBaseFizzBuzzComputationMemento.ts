import type { IFizzBuzzComputationMemento } from "../contracts/IFizzBuzzComputationMemento.js";

export abstract class AbstractBaseFizzBuzzComputationMemento implements IFizzBuzzComputationMemento {
  protected readonly snapshotId: string;
  protected readonly capturedValue: number;
  protected readonly capturedResult: string;
  protected readonly captureTimestamp: number;
  protected readonly mementoType: string;
  protected readonly mementoVersion: string;

  constructor(
    snapshotId: string,
    capturedValue: number,
    capturedResult: string,
    mementoType: string,
    mementoVersion: string,
  ) {
    this.snapshotId = snapshotId;
    this.capturedValue = capturedValue;
    this.capturedResult = capturedResult;
    this.captureTimestamp = Date.now();
    this.mementoType = mementoType;
    this.mementoVersion = mementoVersion;
  }

  abstract toSerializableFormat(): string;

  getSnapshotId(): string { return this.snapshotId; }
  getCapturedValue(): number { return this.capturedValue; }
  getCapturedResult(): string { return this.capturedResult; }
  getCaptureTimestamp(): number { return this.captureTimestamp; }
  getMementoType(): string { return this.mementoType; }
  getMementoVersion(): string { return this.mementoVersion; }
}
