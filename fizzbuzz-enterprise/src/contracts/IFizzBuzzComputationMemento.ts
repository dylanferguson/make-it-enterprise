export interface IFizzBuzzComputationMemento {
  getSnapshotId(): string;
  getCapturedValue(): number;
  getCapturedResult(): string;
  getCaptureTimestamp(): number;
  getMementoType(): string;
  getMementoVersion(): string;
  toSerializableFormat(): string;
}
