import { AbstractBaseFizzBuzzComputationOriginator } from "../abstracts/AbstractBaseFizzBuzzComputationOriginator.js";
import type { IFizzBuzzComputationMemento } from "../contracts/IFizzBuzzComputationMemento.js";
import { FizzBuzzComputationMementoImpl } from "./FizzBuzzComputationMementoImpl.js";

export class FizzBuzzComputationOriginatorImpl extends AbstractBaseFizzBuzzComputationOriginator {
  private static readonly ORIGINATOR_NAME = "FizzBuzzComputationOriginator";
  private static readonly ORIGINATOR_VERSION = "1.0.0-MEMENTO-ORIGINATOR";
  private snapshotCounter = 0;

  constructor() {
    super(
      FizzBuzzComputationOriginatorImpl.ORIGINATOR_NAME,
      FizzBuzzComputationOriginatorImpl.ORIGINATOR_VERSION,
    );
  }

  override createMemento(value: number, result: string): IFizzBuzzComputationMemento {
    this.snapshotCounter++;
    const snapshotId = `memento-${this.snapshotCounter}-${Date.now()}`;
    const stateDescriptor = `Value=${value},Result=${result},Snapshot=${this.snapshotCounter}`;
    return new FizzBuzzComputationMementoImpl(
      snapshotId,
      value,
      result,
      stateDescriptor,
      this.getOriginatorName(),
      this.getOriginatorVersion(),
    );
  }

  override restoreFromMemento(memento: IFizzBuzzComputationMemento): { value: number; result: string } {
    return {
      value: memento.getCapturedValue(),
      result: memento.getCapturedResult(),
    };
  }
}
