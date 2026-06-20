import type { IFizzBuzzComputationMemento } from "./IFizzBuzzComputationMemento.js";

export interface IFizzBuzzComputationCaretaker {
  getCaretakerName(): string;
  getCaretakerVersion(): string;
  captureMemento(memento: IFizzBuzzComputationMemento): void;
  getLatestMemento(): IFizzBuzzComputationMemento | null;
  getMementoByIndex(index: number): IFizzBuzzComputationMemento | null;
  getMementoCount(): number;
  getMementoHistory(): readonly IFizzBuzzComputationMemento[];
  clearHistory(): void;
}
