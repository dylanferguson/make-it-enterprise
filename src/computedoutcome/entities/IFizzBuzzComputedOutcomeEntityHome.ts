import type { IFizzBuzzComputedOutcomeEntity } from "./IFizzBuzzComputedOutcomeEntity.js";

export interface IFizzBuzzComputedOutcomeEntityHome {
  create(primaryKey: number, inputValue: number, computedOutcome: string): IFizzBuzzComputedOutcomeEntity;
  findByPrimaryKey(primaryKey: number): IFizzBuzzComputedOutcomeEntity | null;
  findAll(): readonly IFizzBuzzComputedOutcomeEntity[];
  findByInputValue(inputValue: number): readonly IFizzBuzzComputedOutcomeEntity[];
  remove(primaryKey: number): boolean;
  getHomeName(): string;
  getHomeVersion(): string;
  getEntityBeanCount(): number;
  getSupportedEntityName(): string;
}
