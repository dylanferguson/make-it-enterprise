import type { IFizzBuzzComputedOutcomeEntity } from "../entities/IFizzBuzzComputedOutcomeEntity.js";

export interface IPersistenceContext {
  attachEntity(entity: IFizzBuzzComputedOutcomeEntity): void;
  detachEntity(primaryKey: number): void;
  getEntity(primaryKey: number): IFizzBuzzComputedOutcomeEntity | null;
  getAllEntities(): readonly IFizzBuzzComputedOutcomeEntity[];
  contains(primaryKey: number): boolean;
  clear(): void;
  getEntityCount(): number;
  getContextName(): string;
  getContextVersion(): string;
}
