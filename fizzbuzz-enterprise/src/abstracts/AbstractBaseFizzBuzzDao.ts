import type { IFizzBuzzDao } from "../contracts/IFizzBuzzDao.js";
import type { IFizzBuzzValueTransferObject } from "../contracts/IFizzBuzzValueTransferObject.js";

export abstract class AbstractBaseFizzBuzzDao implements IFizzBuzzDao {
  protected readonly storage: Map<number, IFizzBuzzValueTransferObject> = new Map();
  protected readonly daoName: string;

  constructor(daoName: string) {
    this.daoName = daoName;
  }

  abstract save(value: number, result: string): IFizzBuzzValueTransferObject;
  abstract findById(value: number): IFizzBuzzValueTransferObject | null;
  abstract findAll(): readonly IFizzBuzzValueTransferObject[];
  abstract deleteById(value: number): boolean;
  abstract clear(): void;
  abstract getDaoName(): string;

  getStorageSize(): number {
    return this.storage.size;
  }
}
