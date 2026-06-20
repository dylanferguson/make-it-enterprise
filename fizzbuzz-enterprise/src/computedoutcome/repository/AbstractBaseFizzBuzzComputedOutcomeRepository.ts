import type { IFizzBuzzComputedOutcomeTransferObject } from "../transferobjects/IFizzBuzzComputedOutcomeTransferObject.js";
import type { IFizzBuzzComputedOutcomeRepository } from "./IFizzBuzzComputedOutcomeRepository.js";

export abstract class AbstractBaseFizzBuzzComputedOutcomeRepository
  implements IFizzBuzzComputedOutcomeRepository
{
  protected abstract readonly repositoryName: string;
  protected abstract readonly repositoryVersion: string;
  protected abstract readonly backingEntityManagerName: string;

  abstract save(value: number, outcome: string): IFizzBuzzComputedOutcomeTransferObject;
  abstract findByInputValue(value: number): IFizzBuzzComputedOutcomeTransferObject | null;
  abstract findByPrimaryKey(primaryKey: number): IFizzBuzzComputedOutcomeTransferObject | null;
  abstract findAll(): readonly IFizzBuzzComputedOutcomeTransferObject[];
  abstract count(): number;
  abstract flush(): void;

  getRepositoryName(): string {
    return this.repositoryName;
  }

  getRepositoryVersion(): string {
    return this.repositoryVersion;
  }

  getBackingEntityManagerName(): string {
    return this.backingEntityManagerName;
  }
}
