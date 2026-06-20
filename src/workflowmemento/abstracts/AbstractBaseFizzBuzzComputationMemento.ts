import type { IFizzBuzzComputationMemento } from "../contracts/IFizzBuzzComputationMemento.js";

export abstract class AbstractBaseFizzBuzzComputationMemento implements IFizzBuzzComputationMemento {
  private readonly snapshotId: string;
  private readonly snapshotTimestamp: number;
  private readonly capturedValue: number;
  private readonly capturedResult: string;
  private readonly capturedStateDescriptor: string;
  private readonly originatorName: string;
  private readonly originatorVersion: string;

  constructor(
    snapshotId: string,
    capturedValue: number,
    capturedResult: string,
    capturedStateDescriptor: string,
    originatorName: string,
    originatorVersion: string,
  ) {
    this.snapshotId = snapshotId;
    this.snapshotTimestamp = Date.now();
    this.capturedValue = capturedValue;
    this.capturedResult = capturedResult;
    this.capturedStateDescriptor = capturedStateDescriptor;
    this.originatorName = originatorName;
    this.originatorVersion = originatorVersion;
  }

  getSnapshotId(): string {
    return this.snapshotId;
  }

  getSnapshotTimestamp(): number {
    return this.snapshotTimestamp;
  }

  getCapturedValue(): number {
    return this.capturedValue;
  }

  getCapturedResult(): string {
    return this.capturedResult;
  }

  getCapturedStateDescriptor(): string {
    return this.capturedStateDescriptor;
  }

  getOriginatorName(): string {
    return this.originatorName;
  }

  getOriginatorVersion(): string {
    return this.originatorVersion;
  }
}
