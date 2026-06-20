import type { IFizzBuzzComputedOutcomeTransferObject } from "../transferobjects/IFizzBuzzComputedOutcomeTransferObject.js";

export interface IFizzBuzzComputedOutcomeRepository {
  save(value: number, outcome: string): IFizzBuzzComputedOutcomeTransferObject;
  findByInputValue(value: number): IFizzBuzzComputedOutcomeTransferObject | null;
  findByPrimaryKey(primaryKey: number): IFizzBuzzComputedOutcomeTransferObject | null;
  findAll(): readonly IFizzBuzzComputedOutcomeTransferObject[];
  count(): number;
  flush(): void;
  getRepositoryName(): string;
  getRepositoryVersion(): string;
  getBackingEntityManagerName(): string;
}
