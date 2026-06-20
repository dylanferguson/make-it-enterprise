import { AbstractBaseFizzBuzzComputationCaretaker } from "../abstracts/AbstractBaseFizzBuzzComputationCaretaker.js";
import type { IFizzBuzzComputationMemento } from "../contracts/IFizzBuzzComputationMemento.js";

export class FizzBuzzComputationCaretakerImpl extends AbstractBaseFizzBuzzComputationCaretaker {
  private static readonly CARETAKER_NAME = "FizzBuzzComputationCaretaker";
  private static readonly CARETAKER_VERSION = "1.0.0-MEMENTO-CARETAKER";
  private static readonly MAX_HISTORY_SIZE = 1000;

  constructor() {
    super(
      FizzBuzzComputationCaretakerImpl.CARETAKER_NAME,
      FizzBuzzComputationCaretakerImpl.CARETAKER_VERSION,
    );
  }

  override captureMemento(memento: IFizzBuzzComputationMemento): void {
    if (this.mementoHistory.length >= FizzBuzzComputationCaretakerImpl.MAX_HISTORY_SIZE) {
      this.mementoHistory.shift();
    }
    this.mementoHistory.push(memento);
  }
}
