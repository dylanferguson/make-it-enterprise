import { AbstractBaseFizzBuzzComputationMemento } from "../../abstracts/AbstractBaseFizzBuzzComputationMemento.js";

export class FizzBuzzComputationMementoImpl extends AbstractBaseFizzBuzzComputationMemento {
  private static readonly MEMENTO_TYPE = "FizzBuzzComputationMemento";
  private static readonly MEMENTO_VERSION = "1.0.0-MEMENTO";

  constructor(
    snapshotId: string,
    capturedValue: number,
    capturedResult: string,
  ) {
    super(
      snapshotId,
      capturedValue,
      capturedResult,
      FizzBuzzComputationMementoImpl.MEMENTO_TYPE,
      FizzBuzzComputationMementoImpl.MEMENTO_VERSION,
    );
  }

  override toSerializableFormat(): string {
    return JSON.stringify({
      snapshotId: this.snapshotId,
      capturedValue: this.capturedValue,
      capturedResult: this.capturedResult,
      captureTimestamp: this.captureTimestamp,
      mementoType: this.mementoType,
      mementoVersion: this.mementoVersion,
    });
  }

  static fromSerializedFormat(serialized: string): FizzBuzzComputationMementoImpl {
    const parsed = JSON.parse(serialized);
    return new FizzBuzzComputationMementoImpl(
      parsed.snapshotId,
      parsed.capturedValue,
      parsed.capturedResult,
    );
  }
}
