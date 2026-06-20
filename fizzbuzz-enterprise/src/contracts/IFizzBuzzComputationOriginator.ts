import type { IFizzBuzzComputationMemento } from "./IFizzBuzzComputationMemento.js";

export interface IFizzBuzzComputationOriginator {
  createMemento(value: number, result: string): IFizzBuzzComputationMemento;
  restoreFromMemento(memento: IFizzBuzzComputationMemento): { value: number; result: string };
  getOriginatorName(): string;
  getOriginatorVersion(): string;
}
