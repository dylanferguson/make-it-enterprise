import { AbstractBaseFizzBuzzDao } from "../../abstracts/AbstractBaseFizzBuzzDao.js";
import type { IFizzBuzzValueTransferObject } from "../../contracts/IFizzBuzzValueTransferObject.js";
import { FizzBuzzValueTransferObjectImpl } from "../dto/FizzBuzzValueTransferObjectImpl.js";

export class FizzBuzzDaoImpl extends AbstractBaseFizzBuzzDao {
  private static readonly DEFAULT_DAO_NAME = "FizzBuzzDaoImpl";

  constructor(daoName: string = FizzBuzzDaoImpl.DEFAULT_DAO_NAME) {
    super(daoName);
  }

  override save(value: number, result: string): IFizzBuzzValueTransferObject {
    const dto = new FizzBuzzValueTransferObjectImpl(value);
    dto.setResult(result);
    this.storage.set(value, dto);
    return dto;
  }

  override findById(value: number): IFizzBuzzValueTransferObject | null {
    return this.storage.get(value) ?? null;
  }

  override findAll(): readonly IFizzBuzzValueTransferObject[] {
    return Array.from(this.storage.values());
  }

  override deleteById(value: number): boolean {
    return this.storage.delete(value);
  }

  override clear(): void {
    this.storage.clear();
  }

  override getDaoName(): string {
    return this.daoName;
  }
}
