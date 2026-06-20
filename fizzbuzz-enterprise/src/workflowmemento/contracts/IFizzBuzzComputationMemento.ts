export interface IFizzBuzzComputationMemento {
  getSnapshotId(): string;
  getSnapshotTimestamp(): number;
  getCapturedValue(): number;
  getCapturedResult(): string;
  getCapturedStateDescriptor(): string;
  getOriginatorName(): string;
  getOriginatorVersion(): string;
}
