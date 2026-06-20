import type { IFizzBuzzComputationMemento } from "../contracts/IFizzBuzzComputationMemento.js";
import type { IFizzBuzzComputationCaretaker } from "../contracts/IFizzBuzzComputationCaretaker.js";

export abstract class AbstractBaseFizzBuzzComputationCaretaker implements IFizzBuzzComputationCaretaker {
  private readonly caretakerName: string;
  private readonly caretakerVersion: string;
  protected readonly mementoHistory: IFizzBuzzComputationMemento[] = [];

  constructor(caretakerName: string, caretakerVersion: string) {
    this.caretakerName = caretakerName;
    this.caretakerVersion = caretakerVersion;
  }

  getCaretakerName(): string {
    return this.caretakerName;
  }

  getCaretakerVersion(): string {
    return this.caretakerVersion;
  }

  abstract captureMemento(memento: IFizzBuzzComputationMemento): void;

  getLatestMemento(): IFizzBuzzComputationMemento | null {
    if (this.mementoHistory.length === 0) return null;
    return this.mementoHistory[this.mementoHistory.length - 1] ?? null;
  }

  getMementoByIndex(index: number): IFizzBuzzComputationMemento | null {
    if (index < 0 || index >= this.mementoHistory.length) return null;
    return this.mementoHistory[index] ?? null;
  }

  getMementoCount(): number {
    return this.mementoHistory.length;
  }

  getMementoHistory(): readonly IFizzBuzzComputationMemento[] {
    return [...this.mementoHistory];
  }

  clearHistory(): void {
    this.mementoHistory.length = 0;
  }
}
