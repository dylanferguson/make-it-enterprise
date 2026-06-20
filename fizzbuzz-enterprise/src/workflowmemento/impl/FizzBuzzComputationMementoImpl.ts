import { AbstractBaseFizzBuzzComputationMemento } from "../abstracts/AbstractBaseFizzBuzzComputationMemento.js";

export class FizzBuzzComputationMementoImpl extends AbstractBaseFizzBuzzComputationMemento {
  constructor(
    snapshotId: string,
    capturedValue: number,
    capturedResult: string,
    capturedStateDescriptor: string,
    originatorName: string,
    originatorVersion: string,
  ) {
    super(snapshotId, capturedValue, capturedResult, capturedStateDescriptor, originatorName, originatorVersion);
  }
}
