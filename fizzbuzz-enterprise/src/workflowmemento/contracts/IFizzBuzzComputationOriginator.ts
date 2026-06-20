import type { IFizzBuzzComputationMemento } from "./IFizzBuzzComputationMemento.js";

export interface IFizzBuzzComputationOriginator {
  getOriginatorName(): string;
  getOriginatorVersion(): string;
  createMemento(value: number, result: string): IFizzBuzzComputationMemento;
  restoreFromMemento(memento: IFizzBuzzComputationMemento): { value: number; result: string };
}
