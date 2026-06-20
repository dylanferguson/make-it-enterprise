import type { IFizzBuzzComputationMemento } from "../contracts/IFizzBuzzComputationMemento.js";
import type { IFizzBuzzComputationOriginator } from "../contracts/IFizzBuzzComputationOriginator.js";

export abstract class AbstractBaseFizzBuzzComputationOriginator implements IFizzBuzzComputationOriginator {
  private readonly originatorName: string;
  private readonly originatorVersion: string;

  constructor(originatorName: string, originatorVersion: string) {
    this.originatorName = originatorName;
    this.originatorVersion = originatorVersion;
  }

  getOriginatorName(): string {
    return this.originatorName;
  }

  getOriginatorVersion(): string {
    return this.originatorVersion;
  }

  abstract createMemento(value: number, result: string): IFizzBuzzComputationMemento;

  abstract restoreFromMemento(memento: IFizzBuzzComputationMemento): { value: number; result: string };
}
