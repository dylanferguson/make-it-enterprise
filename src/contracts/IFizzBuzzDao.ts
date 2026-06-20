import type { IFizzBuzzValueTransferObject } from "./IFizzBuzzValueTransferObject.js";

export interface IFizzBuzzDao {
  save(value: number, result: string): IFizzBuzzValueTransferObject;
  findById(value: number): IFizzBuzzValueTransferObject | null;
  findAll(): readonly IFizzBuzzValueTransferObject[];
  deleteById(value: number): boolean;
  clear(): void;
  getDaoName(): string;
}
