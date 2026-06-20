import type { IFizzBuzzComputedOutcomeEntity } from "../entities/IFizzBuzzComputedOutcomeEntity.js";

export interface IEntityManager {
  persist(entity: IFizzBuzzComputedOutcomeEntity): void;
  merge(entity: IFizzBuzzComputedOutcomeEntity): IFizzBuzzComputedOutcomeEntity;
  remove(entity: IFizzBuzzComputedOutcomeEntity): void;
  find(primaryKey: number): IFizzBuzzComputedOutcomeEntity | null;
  findAll(): readonly IFizzBuzzComputedOutcomeEntity[];
  flush(): void;
  clear(): void;
  contains(entity: IFizzBuzzComputedOutcomeEntity): boolean;
  getEntityManagerName(): string;
  getEntityManagerVersion(): string;
  getManagedEntityCount(): number;
}
